const User = require("../Models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.updateMe = catchAsync(async function (req, res, next) {
	if (req.body.password) {
		return next(
			new AppError(
				"Use api/v1/users/updatePassword route to update your password",
				400
			)
		);
	}

	const updateOps = {};

	Object.keys(req.body).forEach((x) => {
		if (x === "name" || x === "email") updateOps[x] = req.body[x];
	});

	const user = await User.findByIdAndUpdate(req.user.id, updateOps, {
		new: true,
		runValidators: true,
	}).select("-passwordChangedAt");

	res.status(200).json({
		status: "success",
		data: { user },
	});
});

exports.logOut = catchAsync(async function (req, res, next) {
	res.cookie("jwt", "hello", {
		expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
	});
	res.status(200).json({
		status: "success",
		message: "Logout successFul",
	});
});

exports.updatePassword = catchAsync(async function (req, res, next) {
	const updatePassOpt = req.body;

	const user = await User.findById(req.user.id).select("+password");

	if (updatePassOpt.role) {
		return next(
			new AppError("Cannot update your role by yourSelf 🚫", 403)
		);
	}

	if (updatePassOpt.name || updatePassOpt.email) {
		return next(
			new AppError(
				"Please use update user details to update name and email 🚫",
				400
			)
		);
	}

	if (req.body.password !== req.body.passwordConfirm) {
		return next(new AppError("Your new Passwords do not match 🚫", 403));
	}

	const ok = await user.comparePasswords(
		req.body.passwordCurrent,
		user.password
	);

	if (!ok) {
		return next(new AppError("Please, Enter the correct password", 403));
	}

	user.password = req.body.password;
	await user.save();

	res.status(200).json({
		status: "success",
		message: "Updated Password successfully 🎆",
	});
});

exports.getAllUsers = catchAsync(async function (req, res, next) {
	const users = await User.find().select("-passwordChangedAt -__v");

	res.status(200).json({
		status: "success",
		data: { users },
	});
	res.end();
});

exports.getUser = catchAsync(async function (req, res, next) {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		status: "success",
		data: { user },
	});
});

exports.deleteUser = catchAsync(async function (req, res, next) {
	await User.findByIdAndDelete(req.params.id);

	res.status(204).json({
		message: "success",
	});
});
