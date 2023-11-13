const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "Booking must belong to a user "],
	},
	price: {
		type: Number,
		required: [true, "Booking must belong have a price "],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	comics: [
		{
			comicId: mongoose.Schema.ObjectId,
			price: String,
			name: String,
			image: String,
		},
	],
	paid: {
		type: Boolean,
		default: true,
	},
});

const Booking = mongoose.model("Booking", bookingsSchema);

module.exports = Booking;
