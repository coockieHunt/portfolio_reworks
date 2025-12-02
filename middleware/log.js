import cfg from '../config/default.cjs';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import winston from 'winston';
import 'winston-daily-rotate-file';

dotenv.config();
const LogConfig = cfg.Log;
const loggersMap = new Map();

/**
 * create or retrieve a Winston logger for a specific log type.
 * @param {string} type - The log type (e.g., 'error', 'info')
 */
const getLogger = (type) => {
    if (loggersMap.has(type)) {
        return loggersMap.get(type);
    }

    const logDirectory = process.env.LOG_DIR || LogConfig.directory;
    const filename = LogConfig.name[type] || 'default.log';

    // Ensure log directory exists
    try {
        const dirPath = path.resolve(logDirectory);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (e) {
        // If directory creation fails, fallback to current working directory
    }

    const transport = new winston.transports.DailyRotateFile({
        dirname: logDirectory,
        filename: filename, 
        datePattern: 'YYYY-MM-DD', 
        zippedArchive: true, 
        maxSize: '5m',      
        maxFiles: '14d'    
    });

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, message }) => {
                return `${timestamp} - ${message}`;
            })
        ),
        transports: [transport]
    });

    loggersMap.set(type, logger);
    return logger;
};

/**
 * Write a log entry using Winston.
 *
 * @param {string} log - The log message to be written.
 * @param {string} type - The type or category (used to select the file).
 */
export const writeToLog = (log, type) => {
    const logger = getLogger(type);
    logger.info(log);
};