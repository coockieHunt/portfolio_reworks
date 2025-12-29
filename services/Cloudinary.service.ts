import { v2 as cloudinary } from 'cloudinary';
import cfg from '../config/default';
import fs from 'fs';

cloudinary.config({
    cloud_name: cfg.cloudinary.cloud_name,
    api_key: cfg.cloudinary.api_key,
    api_secret: cfg.cloudinary.api_secret,
});

export class CloudinaryService {
    static async uploadImage(filePath: string, folder: string = 'blog') {
        console.log('Uploading to Cloudinary:', filePath);
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
                transformation: [
                    { width: Number(process.env.CLOUDINARY_WIDTH) || 800, crop: process.env.CLOUDINARY_CROP },
                    { quality: process.env.CLOUDINARY_QUALITY || "auto" },
                    { fetch_format: "auto" }
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
