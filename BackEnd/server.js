const dotenv = require('dotenv')

process.on("uncaughtException", (err) => {
	console.log("Uncaught Expression, Shutting down !! 💥");
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({
    path: "./config.env",
});

const mongoose = require('mongoose');
const app = require('./app')

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);
mongoose
	.connect(DB)
	.then(() => console.log("DB CONNECTED ..."))
	.catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`server started on ${PORT}`));

process.on("unhandledRejection", (err) => {
	console.log("Uncaught Rejection, Shutting down !! 💥");
	console.log(err.name, err.message);
	server.close(() => process.emit(1));
});
