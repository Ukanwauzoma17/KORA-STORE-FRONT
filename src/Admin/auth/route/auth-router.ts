
import express from "express";
import { login, signUp } from "../controller/admin-controller";
import { resendConfirmationMail, verifyMail } from "../controller/verify-user-controller";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login",login)
router.post("/verify-email/",verifyMail)
router.post("/confirmation-link",resendConfirmationMail)

export default router