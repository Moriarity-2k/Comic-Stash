const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const { default: helmet } = require("helmet");
const cors = require("cors");

const path = require("path");

const compression = require("compression");
const hpp = require("hpp");

const morgan = require("morgan");

const globalErrorHandler = require("./controller/errorController");
const BooksRouter = require("./Routes/booksRoutes");
const UserRouter = require("./Routes/userRoutes");
const ReviewRouter = require("./Routes/reviewRoutes");
const BookingsRouter = require("./Routes/bookingsRoutes");
const { contactUs } = require("./controller/authController");
const AppError = require("./utils/appError");
const { webhookCheckout } = require("./controller/bookingsController");

// books , users , revies , bookings
// tours , users , reviews , bookings

const app = express();

if (process.env.NODE_ENV === "production") {
	const limiter = rateLimit({
		max: 100,
		windowMs: 60 * 60 * 1000,
		message: "Too many requests from this IP, please try again in an hour!",
	});
	app.use("/api", limiter);
}

app.post(
	"/webhook-checkout",
	express.raw({ type: "application/json" }),
	webhookCheckout
);

const corsOptions = {
	origin: true, //included origin as true
	credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(compression());
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(
	express.json({
		limit: 1024 * 1024 * 1024,
	})
);

app.use("/api/v1/books", BooksRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/bookings", BookingsRouter);
app.get("/api/v1/pk_variance", (req, res, next) => {
	res.status(200).json({
		variance: process.env.STRIPE_PUBLIC,
	});
});
app.post("/api/v1/contactUs", contactUs);

app.use(express.static(path.join(__dirname, "FrontEnd", "dist")));
app.get("/*", (req, res, next) => {
	res.send(path.join(__dirname, "FrontEnd", "dist/index.html"));
	next();
});

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
