import { body } from 'express-validator';

export const MailValidator = {
	sendEmail: [
		body('name').notEmpty().withMessage('Name is required'),
		body('email').notEmpty().withMessage('Email is required')
			.isEmail().withMessage('Invalid email format'),
		body('message').notEmpty().withMessage('Message is required')
			.isLength({ max: 2000 }).withMessage('Message exceeds maximum length of 2000 characters')
	]
};
