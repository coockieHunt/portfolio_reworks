import { body, param } from 'express-validator';

export const TagsValidator = {
    getAll: [],
	getBySlug: [
		param('slug').isString().notEmpty(),
	],

	delete: [
		param('slug').isString().notEmpty(),
	],
	
	create: [
		body('name').isString().notEmpty().trim(),
		body('slug').isString().notEmpty().trim().matches(/^[a-z0-9-]+$/),
		body('color').optional().isString().trim()
	]
};
