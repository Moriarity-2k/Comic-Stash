const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Booking = require("../Models/bookingsModel");
const Books = require("../Models/booksModel");

const Image = process.env.FIREBASE_BUCKET;
const token = process.env.FIREBASE_T;

const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	const { products } = req.body;

	const lineItems = products.map((product) => ({
		price_data: {
			currency: "inr",
			product_data: {
				name: product.slug,
				images: [`${Image}${product.image}?alt=media&token=${token}`],
			},
			unit_amount: product.price * 100,
		},
		quantity: product.quantity,
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: lineItems,
		mode: "payment",
		success_url: "http://localhost:5173/my-account",
		cancel_url: "http://localhost:5173/cart",
		customer_email: req.user.email,
		client_reference_id: req.user._id,
	});

	res.json({ id: session.id });
});

const createBooking = async (session) => {
	const user = session.client_reference_id;
	const price = session.lineItems.reduce(
		(acc, item) => item.quantity * (item.price_data.unit_amount / 100),
		0
	);

	const slugs = session.lineItems.map(
		(item) => item.price_data.product_data.name
	);

	const comics = await Books.find({ slug: { $in: slugs } });

	const p = await Booking.create({ user, price, comics });
};

exports.webhookCheckout = catchAsync(async (req, res, next) => {
	const signature = req.headers["stripe-signature"];

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_SECRET_ENDPOINT
		);
	} catch (err) {
		res.status(400).json(`Webhook error : ${err.message}`);
	}

	if (event.type === "checkout.session.completed") {
		// event.data.object => session
		createBooking(event.data.object);
	}

	res.status(200).json({ received: true });
});
