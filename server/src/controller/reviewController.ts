import { NextFunction, Request, Response } from "express";
import Review from "../Models/reviewsModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { IUserId } from "./userController";

export const getAllReviews = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
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

export const createReview = catchAsync(async function (
	req: IUserId,
	res: Response,
	next: NextFunction
) {
	if (!req.body.comic && !req.params.bookId) {
		return next(new AppError("You need to specify a book Id", 400));
	}

	if (!req.body.user) {
		req.body.user = req.user?.id;
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

export const deleteReview = catchAsync(async function (
	req: IUserId,
	res,
	next
) {
	if (!req.body.comic && !req.params.bookId) {
		return next(new AppError("You need to specify a book Id", 400));
	}

	if (!req.body.user) {
		req.body.user = req.user?.id;
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
