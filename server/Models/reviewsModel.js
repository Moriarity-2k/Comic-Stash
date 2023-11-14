const mongoose = require("mongoose");
const Books = require("./booksModel");

const reviewSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			default: "",
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		postedAt: {
			type: Date,
			default: Date.now(),
		},
		comic: {
			type: mongoose.Schema.ObjectId,
			ref: "Books",
			required: [true, "Please specify the book Id "],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Please specify the author/admin Id "],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.index({ comic: 1, user: 1 }, { unique: 1 });

reviewSchema.pre("save", async function (next) {
	const book = await Books.findById(this.comic);
    
	if (book) {
		let rating = book.ratingsAverage * (book.numRatings || 1);
		rating += this.rating;
		const newNum = Number(book.numRatings + 1) || 2;

		book.numRatings = newNum;
		book.ratingsAverage = rating / newNum;
		await book.save();
	}
	next();
});

const Review = mongoose.model("Reviews", reviewSchema);

module.exports = Review;
