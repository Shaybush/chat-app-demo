import { NextFunction, Request, Response } from "express";
import emailService from '../utils/email.util'
import { get_set_redis_cache } from "../utils/redis.util";
import { create_email_code, generate_verification_email, generateTime } from "../utils/function.util";

const DIGITS_LEN = 6;

export const send_digit_to_email = async (req: Request, res: Response, next: NextFunction) => {
	// TODO - add controller here 
	const { email } = req.body;
	const digits = create_email_code(DIGITS_LEN)
	// TODO- check error handling
	await Promise.allSettled([
		emailService.sendEmail(generate_verification_email(email, digits)),
		get_set_redis_cache({
			key: email,
			expirationTime: generateTime({ value: 1, time: 'hour' }),
			callbackFn: () => digits
		})
	]).then((result) => {
		console.log('result:', result);
		res.status(201).json({ message: 'Email sent successfully.' })
	}).catch((err) => next(err))

	console.log('hello');
}