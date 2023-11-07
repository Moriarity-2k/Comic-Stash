const stripe = require("stripe")(process.env.STRIPE_SECRET);

const Image = process.env.FIREBASE_BUCKET;
const token = process.env.FIREBASE_T;

const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	const { products } = req.body;
	const lineItems = products.map((product) => ({
		price_data: {
			currency: "inr",
			product_data: {
				name: product.name,
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
		success_url: "http://localhost:5173/",
		cancel_url: "http://localhost:5173/",
		customer_email: req.user.email,
		client_reference_id: req.user._id,
	});

	res.json({ id: session.id });
});
