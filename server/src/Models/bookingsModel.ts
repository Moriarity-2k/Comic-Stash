import mongoose, { Document, Model, Types } from "mongoose";

interface Ibookings extends Document {
	user: Types.ObjectId;
	price: number;
	createdAt: Date;
	comics: {
		comicId: Types.ObjectId;
		price: string;
		name: string;
		image: string;
	}[];
	paid: boolean;
}

const bookingsSchema = new mongoose.Schema<Ibookings>({
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

const Booking: Model<Ibookings> = mongoose.model<Ibookings>("Booking", bookingsSchema);

export default Booking;
