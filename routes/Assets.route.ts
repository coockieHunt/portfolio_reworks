//express
import express, { Request, Response, Router } from 'express';

//validators
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { rateLimiter } from '../middlewares/rateLimiter.middlewar';

// services
import { AssetsService } from '../services/assets.service';
import { logConsole } from '../middlewares/log.middlewar';

//midelwares
import { authenticateToken } from '../middlewares/authenticateToken.middlewar';

//constants
import { AUTHORIZED_FOLDER_NAMES } from '../constants/asset.constant';

import multer from 'multer';

const assetsRoute: Router = express.Router({ mergeParams: true });

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } 
});

assetsRoute.post('/upload/', 
    rateLimiter,
    authenticateToken,
    upload.single('file'), 
    [
        body('id')
            .isString().withMessage("Id must be a string")
            .matches(/^[A-Z][a-zA-Z0-9]*$/)
            .withMessage("Id must start with an uppercase letter and contain no spaces or special characters (e.g., MonID)"),
            
        body('name').isString().withMessage('Name must be a string'),
        body('folder')
            .optional()
            .isIn(AUTHORIZED_FOLDER_NAMES)
            .withMessage(`Folder must be one of: ${AUTHORIZED_FOLDER_NAMES.join(', ')}`),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        if (!req.file) {
            logConsole("POST", "/assets/upload", "FAIL", "No file uploaded");
            res.error('No file uploaded', 400);
            return;
        }

        const uploadedFilename = await AssetsService.uploadAsset(
            req.file.buffer, 
            req.body.name || req.file.originalname, 
            req.body.id,
            req.body.folder || 'blog'
        );

        if (!uploadedFilename) {
            logConsole("POST", "/assets/upload", "FAIL", "Upload failed in service");
            res.error('Upload failed', 500);
            return;
        }

        logConsole("POST", "/assets/upload", "OK", "File uploaded successfully", { file: req.file.originalname, path: uploadedFilename });

        return res.success({ path: uploadedFilename }, 'File uploaded successfully');
    }
);

assetsRoute.delete('/delete/:folder/:id',
    authenticateToken,
    rateLimiter,
    async (req: Request, res: Response) => {
        const { folder, id } = req.params;

        const deletionResult = await AssetsService.deleteAsset(id as string, folder as string);
        if (!deletionResult) {
            logConsole("DELETE", `/assets/delete/${folder}/${id}`, "FAIL", "Asset deletion failed or asset not found", { id, folder });
            return res.error('Asset deletion failed or asset not found', 404);
        }

        logConsole("DELETE", `/assets/delete/${folder}/${id}`, "OK", "Asset deleted successfully", { id, folder });
        return res.removed(id as string, 'Asset deleted successfully');
    }
);

assetsRoute.delete('/cache/clear/:id',
    authenticateToken,
    rateLimiter,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const keysDeleted = await AssetsService.clearAssetsCache(id as string);
            logConsole("DELETE", `/assets/cache/clear/${id}`, "OK", "Cache cleared successfully", { id, keysDeleted });
            return res.removed(id as string, 'Cache cleared successfully');
        } catch (error) {
            logConsole("DELETE", `/assets/cache/clear/${id}`, "FAIL", "Error clearing cache", { error });
            return res.error('Error clearing cache', 500);
        }
    }
);

assetsRoute.delete('/cache/all',
    authenticateToken,
    rateLimiter,
    async (req: Request, res: Response) => {
        try {
            await AssetsService.clearAllAssets();
            logConsole("DELETE", `/assets/cache/clear-all`, "OK", "All assets cache cleared successfully");
            return res.success({}, 'All assets cache cleared successfully');
        } catch (error) {
            logConsole("DELETE", `/assets/cache/clear-all`, "FAIL", "Error clearing all assets cache", { error });
            return res.error('Error clearing all assets cache', 500);
        }
    }
);

assetsRoute.get('/list',
    authenticateToken,
    rateLimiter,
    async (req: Request, res: Response) => {
        try {
            const assetList = await AssetsService.listAllAssets();
            logConsole("GET", `/assets/list`, "OK", "Asset list retrieved successfully", { count: assetList.length });
            return res.success({ assets: assetList }, 'Asset list retrieved successfully');
        } catch (error) {
            logConsole("GET", `/assets/list`, "FAIL", "Error retrieving asset list", { error });
            return res.error('Error retrieving asset list', 500);
        }
    }
);

export default assetsRoute;