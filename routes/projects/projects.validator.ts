import { body, param, query } from 'express-validator';

export const ProjectsValidator = {
    getProjects: [],
    getProjectById: [
        param('id').isInt().withMessage('Project ID must be an integer'),
    ],

    getOffset: [
        query('min').optional().isInt({ min: 1 }).withMessage('Min must be a positive integer'),
        query('max').optional().isInt({ min: 1, max: 100 }).withMessage('Max must be a positive integer between 1 and 100'),
    ],

    create: [
        body('title').notEmpty().withMessage('Title is required').trim(),
        body('tabName').notEmpty().withMessage('Tab name is required').trim(),
        body('description').notEmpty().withMessage('Description is required').trim(),
        body('content').notEmpty().withMessage('Content is required'),
        body('stack').notEmpty().withMessage('Stack is required'), 
        body('UrlGithub').notEmpty().withMessage('Github URL is required').isURL().withMessage('Must be a valid URL'),
        body('UrlProject').optional({ checkFalsy: true }).isURL().withMessage('Must be a valid URL'),
        body('published').optional().isInt({ min: 0, max: 1 }).withMessage('Published must be 0 or 1'),
        body('gallery').optional().isArray().withMessage('Gallery must be an array of image IDs'),
    ],

    update: [
        param('id').isInt().withMessage('Project ID must be an integer'),
        body('title').optional().isString().trim(),
        body('tabName').optional().isString().trim(),
        body('description').optional().isString().trim(),
        body('content').optional().isString(),
        body('stack').optional(),
        body('UrlGithub').optional().isURL().withMessage('Must be a valid URL'),
        body('UrlProject').optional().isURL().withMessage('Must be a valid URL'),
        body('published').optional().isInt({ min: 0, max: 1 }).withMessage('Published must be 0 or 1'),
        body('gallery').optional().isArray().withMessage('Gallery must be an array of image IDs'),
    ],

    updatePublish: [
        param('id').isInt().withMessage('Project ID must be an integer'),
        body('publish').isBoolean().withMessage('Publish must be a boolean')
    ],

    delete: [
        param('id').isInt().withMessage('Project ID must be an integer'),
    ]
};
