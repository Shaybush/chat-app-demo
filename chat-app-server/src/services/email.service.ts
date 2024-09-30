import { NextFunction, Request, Response } from "express";
import emailService from '../utils/email.util'

export const send_digit_to_email = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body
	const emailOptions = {
		to: email,
		subject: 'Login Verification!',
		text: 'Thank you for joining our platform.',
		html: `<h1>Welcome!</h1><p>your verification code: ${123456}</p>`,
	};

	try {
		await emailService.sendEmail(emailOptions)
		res.status(201).json({ message: 'Email sent successfully.' })
	} catch (error) {
		next(error)
	}
}