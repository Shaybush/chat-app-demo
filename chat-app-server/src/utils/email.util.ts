import nodemailer, { Transporter } from 'nodemailer';
import { AppError } from '../error/appError';
import CommonResponseDict from './common-response-dict.utils';
import { config } from 'dotenv';

interface EmailOptions {
	from?: string;
	to: string | string[];
	subject: string;
	html?: string;
	text?: string;
}

class EmailService {
	private transporter: Transporter;

	constructor() {
		config();
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL for port 465, false for port 587
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
	}

	/**
	 * Sends an email with the provided options.
	 * @param {EmailOptions} options - Email options (to, subject, text, html).
	 * @returns {Promise<void>}
	 */
	async sendEmail(options: EmailOptions): Promise<void> {
		try {
			const mailOptions = {
				from: options.from || process.env.EMAIL_USER, // Default from address
				to: options.to,
				subject: options.subject,
				text: options.text,
				html: options.html,
			};

			await this.transporter.sendMail(mailOptions);
			console.log('Email sent successfully.');
		} catch (error) {
			console.error('Error sending email:', error);
			throw new AppError(
				CommonResponseDict.InternalServerError.title,
				CommonResponseDict.InternalServerError.code,
				`Error sending email: ${error.message}`,
				false
			);
		}
	}
}

export default new EmailService();
