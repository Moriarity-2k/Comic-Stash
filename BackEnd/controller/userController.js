const User = require("../Models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.updateMe = catchAsync(async function (req, res, next) {
	if (req.body.password) {
		return next(
			"Use api/v1/users/updatePassword route to update your password"
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
		return next("Cannot update your role by yourSelf 🚫");
	}

	if (updatePassOpt.name || updatePassOpt.email) {
		return next(
			"Please use update user details to update name and email 🚫"
		);
	}

	if (req.body.password !== req.body.passwordConfirm) {
		return next("Your new Passwords do not match 🚫");
	}

	const ok = await user.comparePasswords(
		req.body.passwordCurrent,
		user.password
	);

	if (!ok) {
		return next("Please, Enter the correct password");
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
	// console.log("user is ", x.passwordChangedAt.toISOString());
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
	const user = await User.findByIdAndDelete(req.params.id);

    
	res.status(204).json({
		message: "success",
	});
});
