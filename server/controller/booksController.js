const catchAsync = require("../utils/catchAsync");
const Books = require("../Models/booksModel");
const AppError = require("../utils/appError");

exports.getAllBooks = catchAsync(async function (req, res, next) {
	const comics = await Books.find();

	res.status(200).send({
		status: "success",
		data: {
			comics,
		},
	});
});

exports.createBook = catchAsync(async function (req, res, next) {
	const comic = await Books.create(req.body);
	res.status(201).send({
		status: "success",
		data: {
			comic,
		},
	});
});

exports.getOneBook = catchAsync(async function (req, res, next) {
	const param = req.params.id;

	const obj = {};

	if (+param[0]) {
		obj.id = param;
	} else obj.slug = param;

	const comic = await Books.findOne(obj);
	res.status(200).json({
		status: "success",
		data: {
			comic,
		},
	});
});

exports.deleteOneBook = catchAsync(async function (req, res, next) {
	await Books.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: "success",
	});
});

exports.updateOneBook = catchAsync(async function (req, res, next) {
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
