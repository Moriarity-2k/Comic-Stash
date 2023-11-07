const { Router } = require("express");
const { protect } = require("../controller/authController");
const {
	getAllReviews,
	createReview,
	deleteReview,
} = require("../controller/reviewController");

const router = Router({ mergeParams: true });

// note: creating a review -> either by specifying
// allowing only when logged in
// 1) user and tour id on req
// 2) put user from auth (req.user.id)
// 3) If no tour id on req and params throw error

// 1) get all reviews of a tour and post review
// 2) delete review with tourId and userId

router
	.route("/")
	.get(getAllReviews)
	.post(protect, createReview)
	.delete(protect, deleteReview);

module.exports = router;
