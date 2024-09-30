import express from "express";
import { send_digit_to_email } from "../services/email.service";
const router = express();

router.post('/send-code', send_digit_to_email)
router.post('/verify-code', () => { })
router.post('/sign-up', () => { })

export default router;