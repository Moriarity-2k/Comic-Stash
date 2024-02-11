import { Router } from "express";
import { protect } from "../controller/authController";
import { getCheckoutSession } from "../controller/bookingsController";

const router = Router();

router.use(protect);

router.post("/create-checkout-session", protect, getCheckoutSession);

export default router;
