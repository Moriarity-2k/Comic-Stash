import mongoose, { Model, Query } from "mongoose";
import bcrypt from "bcryptjs";
import { NextFunction } from "express";
import crypto from "crypto";

export interface UserSchemaInterface extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: string;
	passwordChangedAt: Date;
	active: boolean;
	passwordResetToken?: string;
	passwordIsvalidTill?: Date;

	createPasswordResetToken(): string;
	comparePasswords(receivedPass: string, pass: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserSchemaInterface>(
	{
		name: {
			type: String,
			required: [true, "Please specify the name"],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Please specify your Email"],
		},
		password: {
			type: String,
			min: 8,
			required: [true, "Please specify your password"],
			select: false,
		},
		passwordConfirm: {
			type: String,
			validate: {
				validator(this: any, val: string): boolean {
					// return this.password === val;
					return this.get("password") === val;
				},
				message: "Passwords are not same. Try Again",
			},
			select: false,
			required: [true, "Please confirm your password"],
		},
		role: {
			type: String,
			default: "user",
			enum: {
				values: ["user", "admin", "author", "owner"],
				message: "You cannot explicitly choose your role to be admin",
			},
		},
		passwordChangedAt: {
			type: Date,
			default: Date.now(),
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		passwordResetToken: String,
		passwordIsvalidTill: Date,
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
userSchema.pre<UserSchemaInterface>("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 13);
	}
	this.passwordConfirm = "";
	next();
});

userSchema.pre<Model<UserSchemaInterface>>(
	/^find/,
	async function (this: any, next) {
		this.find({ active: true });
		next();
	}
);

userSchema.methods.createPasswordResetToken = function (): string {
	const sec = crypto.randomBytes(32).toString("hex");
	console.log(sec);
	const resetToken = crypto.createHash("sha256").update(sec).digest("hex");
	this.passwordResetToken = resetToken;
	this.passwordIsvalidTill = new Date(Date.now() + 10 * 60 * 1000);
	return sec;
};

userSchema.methods.comparePasswords = async function (
	receivedPass: string,
	pass: string
): Promise<boolean> {
	return await bcrypt.compare(receivedPass, pass);
};

const User: Model<UserSchemaInterface> = mongoose.model<UserSchemaInterface>(
	"User",
	userSchema
);

export default User;
