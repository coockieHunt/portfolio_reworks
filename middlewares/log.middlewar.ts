// log
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

//config
import cfg from '../config/default.ts';

dotenv.config();

interface LogConfigInterface {
    directory: string;
    name: Record<string, string>;
}

const LogConfig = cfg.Log as LogConfigInterface;
const loggersMap = new Map<string, winston.Logger>();

/**
 * Create or retrieve a Winston logger for a specific log type.
 * @param type - The log type (e.g., 'error', 'info')
 */
const getLogger = (type: string): winston.Logger => {
    if (loggersMap.has(type)) {
        return loggersMap.get(type)!;
    }

    const logDirectory: string = process.env.LOG_DIR || LogConfig.directory;
    const filename: string = LogConfig.name[type] || 'default.log';

    try {
        const dirPath = path.resolve(logDirectory);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (e) {}

    const transport = new DailyRotateFile({
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
 * @param log - The log message to be written.
 * @param type - The type or category (used to select the file).
 */
export const writeToLog = (log: string, type: string): void => {
    const logger = getLogger(type);
    logger.info(log);
};