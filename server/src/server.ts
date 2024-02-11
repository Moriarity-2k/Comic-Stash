import { config } from "dotenv";
import mongoose, { mongo } from "mongoose";

import app from './app'

process.on("uncaughtException", (err) => {
	console.log("Uncaught Expression, Shutting down !! 💥");
	process.exit(1);
});

config({
	path: "../config.env",
});

const DB = process.env.DATABASE!.replace(
	"<password>",
	process.env.DATABASE_PASSWORD!
);

mongoose
	.connect(DB)
	.then(() => console.log("DB Connected ..."))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});

process.on("unhandledRejection", (err: Error | any) => {
	console.log("Uncaught Rejection, Shutting down !! 💥");
	if (process.env.NODE_ENV === "development") {
		console.log(err.message);
	}

	server.close(() => process.exit(1));
});
