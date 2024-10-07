import { NextFunction, Request, Response } from "express";
import emailService from '../utils/email.util'
import { set_redis_cache } from "../utils/redis.util";
import { create_email_code, generate_verification_email, generateTime } from "../utils/function.util";
import bcrypt from 'bcrypt'

const DIGITS_LEN = 6;

export const send_digit_to_email = async (req: Request, res: Response, next: NextFunction) => {
	// TODO - add controller here 
	const { email } = req.body;
	const digits = create_email_code(DIGITS_LEN)
	const hashedPassword = await bcrypt.hash(JSON.stringify(digits),10);	
	try {
		await set_redis_cache({
			key: email,
			expirationTime: generateTime({ value: 1, time: 'hour' }),
			callbackFn: () => hashedPassword
		})	
		await  emailService.sendEmail(generate_verification_email(email, digits));
	} catch (error) {
		next(error);	
	}
}