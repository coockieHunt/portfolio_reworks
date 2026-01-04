import { v2 as cloudinary } from 'cloudinary';
import cfg from '../config/default';
import fs from 'fs';
import https from 'https';
import { Response } from 'express';
import chalk from 'chalk';

cloudinary.config({
    cloud_name: cfg.cloudinary.cloud_name,
    api_key: cfg.cloudinary.api_key,
    api_secret: cfg.cloudinary.api_secret,
});

export class CloudinaryService {
    static async proxyImage(publicId: string, res: Response): Promise<void> {
        const imageUrl = cloudinary.url('blog/' + publicId, { secure: true });

        return new Promise((resolve) => {
            https.get(imageUrl, (stream) => {
                
                if (stream.statusCode !== 200) {
                    res.status(stream.statusCode || 404).send('Image introuvable');
                    resolve();
                    return;
                }

                const contentType = stream.headers['content-type'];
                if (contentType) {
                    res.setHeader('Content-Type', contentType);
                }
                
                res.setHeader('Cache-Control', 'public, max-age=3600'); 

                stream.pipe(res);

                stream.on('end', () => {
                    resolve();
                });

            }).on('error', (err) => {
                console.error('Erreur proxy image:', err);
                res.status(500).send('Erreur serveur lors du téléchargement');
                resolve();
            });
        });
    }


    static async uploadImage(filePath: string, folder: string = 'blog') {
        console.log(
            chalk.bgGreen(`[Upload]`,) +
            chalk.white(` Uploading image to Cloudinary from ${filePath}`)
        )
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
                format: 'webp',
                transformation: [
                    { width: Number(process.env.CLOUDINARY_WIDTH) || 800, crop: process.env.CLOUDINARY_CROP },
                    { quality: process.env.CLOUDINARY_QUALITY || "auto" },
                ]
            });
            
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            return result;
        } catch (error) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw error;
        }
    }

    static async deleteImage(publicId: string) {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async listImages(folder: string = 'blog') {
        try {
            const result = await cloudinary.search
                .expression(`folder:${folder}`)
                .sort_by('created_at', 'desc')
                .max_results(30)
                .execute();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
