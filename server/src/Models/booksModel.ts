import mongoose, { Model } from "mongoose";
import slugify from "slugify";

interface booksSchemaInterface {
	name: string;
	description: string;
	publishedAt: Date;
	ratingsAverage?: number;
	image?: string;
	numRatings?: number;
	genre?: string;
	numPages: number;
	author: string;
	price: number;
	slug?: string;
}

const booksSchema = new mongoose.Schema<booksSchemaInterface>(
	{
		name: {
			type: String,
			min: 8,
		},
		description: {
			type: String,
			required: [true, "Comic required the description"],
		},
		publishedAt: {
			type: Date,
			required: [true, "Please provide the data of publish"],
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be >= 1"],
			max: [5, "Rating must be <= 5"],
			set: function (val: number) {
				return ((val * 10) / 10).toFixed(1);
			},
		},
		image: String,
		numRatings: {
			type: Number,
			default: 1,
		},
		genre: {
			type: String,
			default: "Humor",
		},
		numPages: {
			type: Number,
			required: [
				true,
				"Please specify number of pages for better understanding",
			],
		},
		author: {
			type: String,
			required: [true, "Please specify the author name"],
		},
		price: {
			type: Number,
			default: 0,
		},
		slug: String,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

booksSchema.pre<booksSchemaInterface>("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Books: Model<booksSchemaInterface> = mongoose.model<booksSchemaInterface>(
	"Books",
	booksSchema
);

export default Books;
