import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import hpp from "hpp";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { NextFunction, Request, Response } from "express";

import BooksRouter from "./Routes/booksRoutes";
import UserRouter from "./Routes/userRoutes";
import ReviewRouter from "./Routes/reviewRoutes";
import BookingsRouter from "./Routes/bookingsRoutes";
import { contactUs } from "./controller/authController";
import { webhookCheckout } from "./controller/bookingsController";

import AppError from "./utils/appError";
import globalErrorHandler from "./controller/errorController";

// books , users , revies , bookings
// tours , users , reviews , bookings

const app = express();

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", true);
	const limiter = rateLimit({
		max: 100,
		windowMs: 60 * 60 * 1000,
		message: "Too many requests from this IP, please try again in an hour!",
	});
	app.use("/api", limiter);
}

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

app.post(
	"/webhook-checkout",
	express.raw({ type: "application/json" }),
	webhookCheckout
);

app.use(
	express.json({
		limit: 1024 * 1024 * 1024,
	})
);

app.use("/api/v1/books", BooksRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/bookings", BookingsRouter);
app.get(
	"/api/v1/pk_variance",
	(req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({
			variance: process.env.STRIPE_PUBLIC,
		});
	}
);
app.post("/api/v1/contactUs", contactUs);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
