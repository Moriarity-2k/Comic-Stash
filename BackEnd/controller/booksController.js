const Books = require("../Models/booksModel");

const catchAsync = require("../utils/catchAsync");

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

    console.log(req.body.image)
	// const comic = await Books.create(req.body);
	res.status(200).send({
		status: "success",
		// data: {
		// 	comic,
		// },
	});
});

exports.getOneBook = catchAsync(async function (req, res, next) {
	const param = req.params.id;

	const obj = {};

	console.log(+param[0]);

	if (+param[0]) {
		obj.id = param;
	} else obj.slug = param;

	console.log(obj);

	const comic = await Books.findOne(obj);
	res.status(200).json({
		status: "success",
		data: {
			comic,
		},
	});
});

exports.deleteOneBook = catchAsync(async function (req, res, next) {
	await Books.deleteOneById({ id: req.prams.id });

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
		return next(new Error("No Comic found with that Id"));
	}

	res.status(200).send({
		status: "success",
		data: {
			book,
		},
	});
});
