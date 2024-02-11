import { Router } from "express";
import {
	createBook,
	deleteOneBook,
	getAllBooks,
	getOneBook,
	updateOneBook,
} from "../controller/booksController";

import reviewRouter from "./reviewRoutes";
import {
	protect,
	resizeComicImages,
	restricTo,
	uploadImage,
} from "../controller/authController";

const router = Router();

router.use("/:bookId/reviews", reviewRouter);

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

export default router;
