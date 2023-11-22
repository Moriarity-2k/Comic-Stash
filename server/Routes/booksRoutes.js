const { Router } = require("express");
const {
	getAllBooks,
	createBook,
	getOneBook,
	updateOneBook,
	deleteOneBook,
} = require("../controller/booksController");
const reviewRouter = require("./reviewRoutes");
const {
	protect,
	restricTo,
	uploadImage,
	resizeComicImages,
} = require("../controller/authController");

const router = Router();

router.use("/:bookId/reviews", reviewRouter);

// get and create
router
	.route("/")
	.get(getAllBooks)
	.post(
		protect,
		restricTo("admin", "author", "owner"),
		uploadImage,
		resizeComicImages,
		createBook
	);

// get by Id and update
router
	.route("/:id")
	.get(getOneBook)
	.patch(protect, restricTo("author", "admin", "owner"), updateOneBook)
	.delete(protect, restricTo("admin", "author", "owner"), deleteOneBook);

module.exports = router;
