const { Router } = require("express");
const { protect } = require("../controller/authController");
const {
	getAllReviews,
	createReview,
	deleteReview,
} = require("../controller/reviewController");

const router = Router({ mergeParams: true });

router
	.route("/")
	.get(getAllReviews)
	.post(protect, createReview)
	.delete(protect, deleteReview);

module.exports = router;
