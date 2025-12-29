import express, { Request, Response, Router, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// services
import { CloudinaryService } from '../services/Cloudinary.service';

// middlewares
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';
import { responseHandler } from '../middlewares/responseHandler.middlewar';
import { writeToLog, logConsole } from '../middlewares/log.middlewar';
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';

const CloudinaryRoute: Router = express.Router();

// Configure multer for temporary storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

CloudinaryRoute.post('/upload', 
    rateLimiter,
    authenticateToken,
    (req: Request, res: Response, next: NextFunction) => {
        upload.single('image')(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    logConsole('POST', '/cloudinary/upload', 'FAIL', `File too large`, { error: err });
                    return res.error("File too large. Maximum size is 10MB", 400, err);
                }
                logConsole('POST', '/cloudinary/upload', 'FAIL', `File upload error`, { error: err });
                return res.error("File upload error", 400, err);
            } else if (err) {
                logConsole('POST', '/cloudinary/upload', 'FAIL', `Unknown error during upload`, { error: err });
                return res.error("Unknown error during upload", 500, err);
            }
            next();
        });
    },
    async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                logConsole('POST', '/cloudinary/upload', 'FAIL', `No image file provided`);
                return res.error("No image file provided", 400);
            }

            const result = await CloudinaryService.uploadImage(req.file.path);
            
            logConsole('POST', '/cloudinary/upload', 'OK', `Uploaded image to Cloudinary`, { public_id: result.public_id });
            writeToLog(`CloudinaryRoute UPLOAD ok public_id=${result.public_id}`, 'cloudinary');

            return res.success({
                url: result.secure_url,
                public_id: result.public_id,
                format: result.format,
                width: result.width,
                height: result.height
            });
        } catch (error) {
            logConsole('POST', '/cloudinary/upload', 'FAIL', `Error uploading image`, { error });
            writeToLog(`CloudinaryRoute UPLOAD error`, 'cloudinary');
            return res.error("Error uploading image", 500, error);
        }
    },
    responseHandler
);

// Delete image
CloudinaryRoute.delete('/delete',
    rateLimiter,
    authenticateToken,
    async (req: Request, res: Response) => {
        const { public_id } = req.body;

        if (!public_id) {
            logConsole('DELETE', '/cloudinary/delete', 'FAIL', `public_id is required`);
            return res.error("public_id is required", 400);
        }

        try {
            const result = await CloudinaryService.deleteImage(public_id);
            
            logConsole('DELETE', '/cloudinary/delete', 'OK', `Deleted image from Cloudinary`, { public_id });
            writeToLog(`CloudinaryRoute DELETE ok public_id=${public_id}`, 'cloudinary');

            return res.success(result);
        } catch (error) {
            logConsole('DELETE', '/cloudinary/delete', 'FAIL', `Error deleting image`, { error });
            writeToLog(`CloudinaryRoute DELETE error`, 'cloudinary');
            return res.error("Error deleting image", 500, error);
        }
    },
    responseHandler
);

// List images
CloudinaryRoute.get('/list',
    rateLimiter,
    authenticateToken,
    async (req: Request, res: Response) => {
        try {
            const folder = req.query.folder as string || process.env.CLOUDINARY_FOLDER || 'blog';
            const result = await CloudinaryService.listImages(folder);
            
            logConsole('GET', '/cloudinary/list', 'OK', `Listed images from Cloudinary`, { folder });
            writeToLog(`CloudinaryRoute LIST ok folder=${folder}`, 'cloudinary');

            return res.success(result);
        } catch (error) {
            logConsole('GET', '/cloudinary/list', 'FAIL', `Error listing images`, { error });
            writeToLog(`CloudinaryRoute LIST error`, 'cloudinary');
            return res.error("Error listing images", 500, error);
        }
    },
    responseHandler
);

export default CloudinaryRoute;
