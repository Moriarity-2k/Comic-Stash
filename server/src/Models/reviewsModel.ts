import mongoose, { Types } from "mongoose";
import Books from "./booksModel";

interface IReview {
	review: string;
	rating: number;
	postedAt: Date;
	comic: Types.ObjectId;
	user: Types.ObjectId;
}

const reviewSchema = new mongoose.Schema<IReview>(
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

reviewSchema.index({ comic: 1, user: 1 }, { unique: true });

reviewSchema.pre<IReview>("save", async function (this: any, next: () => void) {
	const book = await Books.findById(this.comic);

	if (book) {
		let rating = book.ratingsAverage! * (book.numRatings || 1);
		rating += this.rating;
		const newNum = Number(book.numRatings! + 1) || 2;

		book.numRatings = newNum;
		book.ratingsAverage = rating / newNum;
		await book.save();
	}
	next();
});

const Review = mongoose.model("Reviews", reviewSchema);

export default Review;
