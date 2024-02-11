import { NextFunction, Request, Response } from "express";
import Books from "../Models/booksModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getAllBooks = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const comics = await Books.find();
	res.status(200).send({
		status: "success",
		data: {
			comics,
		},
	});
});

export const createBook = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const comic = await Books.create(req.body);
	res.status(201).send({
		status: "success",
		data: {
			comic,
		},
	});
});

export const getOneBook = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const param = req.params.id;

	const obj: Partial<{
		id?: any;
		slug?: string;
	}> = {};

	if (+param[0]) {
		obj.id = param;
	} else {
		obj.slug = param;
	}

	const comic = await Books.findOne(obj);

	res.status(200).json({
		status: "success",
		data: {
			comic,
		},
	});
});

export const deleteOneBook = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	await Books.findByIdAndDelete(req.params.id);
	res.status(200).json({
		status: "success",
	});
});

export const updateOneBook = catchAsync(async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const book = await Books.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
		new: true,
	});

	if (!book) {
		return next(new AppError("No Comic found with that Id", 400));
	}

	res.status(200).send({
		status: "success",
		data: {
			book,
		},
	});
});
