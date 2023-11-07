const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
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
				validator(val) {
					return this.password === val;
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
				values: ["user", "admin", "author"],
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

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 13);
	}
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre(/^find/, async function (next) {
	this.find({ active: true });
	next();
});

userSchema.methods.createPasswordResetToken = function () {
	const sec = crypto.randomBytes(32).toString("hex");
    console.log(sec);
	const resetToken = crypto.createHash("sha256").update(sec).digest("hex");
	this.passwordResetToken = resetToken;
	this.passwordIsvalidTill = new Date(Date.now() + 10 * 60 * 1000);
	return sec;
};

userSchema.methods.comparePasswords = async function (receivedPass, pass) {
	return await bcrypt.compare(receivedPass, pass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
