const Review = require("../Models/reviewsModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async function (req, res, next) {
	if (!req.params.bookId) {
		return next(new AppError("You need to specify a book Id", 400));
	}

	const comic = req.body.comic || req.params.bookId;

	const reviews = await Review.find({ comic })
		.populate({
			path: "user",
			select: "name email",
		})
		.select("rating review postedAt user");

	res.status(200).json({
		status: "success",
		data: {
			reviews,
		},
	});
});

exports.createReview = catchAsync(async function (req, res, next) {
	if (!req.body.comic && !req.params.bookId) {
		return next(new AppError("You need to specify a book Id", 400));
	}

	if (!req.body.user) {
		req.body.user = req.user.id;
	}

	if (!req.body.comic) {
		req.body.comic = req.params.bookId;
	}

	const review = await Review.create(req.body);

	res.status(201).json({
		status: "success",
		data: {
			review: {
				rating: review.rating,
				review: review.review,
				postedAt: review.postedAt,
			},
		},
	});

	res.status(200);
});

exports.deleteReview = catchAsync(async function (req, res, next) {
	if (!req.body.comic && !req.params.bookId) {
		return next(new AppError("You need to specify a book Id", 400));
	}

	if (!req.body.user) {
		req.body.user = req.user.id;
	}

	if (!req.body.comic) {
		req.body.comic = req.params.bookId;
	}

	const x = await Review.findOneAndDelete({
		tour: req.body.tour,
		user: req.body.user,
	});

	if (!x) {
		next(new AppError("No reviews found with that Id", 403));
	}

	res.status(202).json({
		status: "success",
		message: "Your review is succesfully deleted ",
	});
});
