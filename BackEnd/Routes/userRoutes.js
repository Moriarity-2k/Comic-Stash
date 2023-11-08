const { Router } = require("express");
const {
	signUp,
	login,
	protect,
	forgotpassword,
	resetPassword,
	restricTo,
} = require("../controller/authController");
const {
	getAllUsers,
	updateMe,
	updatePassword,
	logOut,
	deleteUser,
} = require("../controller/userController");

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/login").post(login);

router.route("/forgotPassword").post(forgotpassword);
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/logout").get(logOut);

router.use(protect);

router.route("/updateMe").patch(updateMe);
router.route("/updatePassword").patch(updatePassword);

router.use(restricTo("admin"));
router.route("/").get(getAllUsers);

router.route("/:id").delete(deleteUser);

// router.route('/:id').get().patch().delete();

module.exports = router;
// model , controller , router
