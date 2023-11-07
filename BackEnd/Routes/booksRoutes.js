const { Router } = require("express");
const {
	getAllBooks,
	createBook,
	getOneBook,
	updateOneBook,
	deleteOneBook,
} = require("../controller/booksController");
const reviewRouter = require("./reviewRoutes");
const { protect, restricTo } = require("../controller/authController");

const router = Router();

router.use("/:bookId/reviews", reviewRouter);

// get and create
router
	.route("/")
	.get(getAllBooks)
	.post(protect, restricTo("admin author"), createBook);

// get by Id and update
router
	.route("/:id")
	.get(getOneBook)
	.patch(protect, restricTo("author", "admin"), updateOneBook)
	.delete(protect, restricTo("admin", "author"), deleteOneBook);

module.exports = router;
