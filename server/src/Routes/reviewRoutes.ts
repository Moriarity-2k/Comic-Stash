import { Router } from "express";
import {
	createReview,
	deleteReview,
	getAllReviews,
} from "../controller/reviewController";
import { protect } from "../controller/authController";

const router = Router({ mergeParams: true });

router
	.route("/")
	.get(getAllReviews)
	.post(protect, createReview)
	.delete(protect, deleteReview);

export default router;
