import { Router } from "express";
import {
	forgotpassword,
	login,
	protect,
	resetPassword,
	restricTo,
	signUp,
} from "../controller/authController";
import {
	deleteUser,
	getAllUsers,
	logOut,
	updateMe,
	updatePassword,
} from "../controller/userController";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/login").post(login);

router.route("/forgotPassword").post(forgotpassword);
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/logout").get(logOut);

router.use(protect);

router.route("/updateMe").patch(updateMe);
router.route("/updatePassword").patch(updatePassword);

router.use(restricTo("admin", "owner"));
router.route("/").get(getAllUsers);

router.route("/:id").delete(deleteUser);

export default router;
