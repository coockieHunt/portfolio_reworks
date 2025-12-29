import path from 'path'; // Module Node.js (utilisé dans getLogger)
import fs from 'fs';
import dotenv from 'dotenv';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import chalk from 'chalk';

// config
import cfg from '../config/default';

dotenv.config();

interface LogConfigInterface {
    directory: string;
    name: Record<string, string>;
}

const loggersMap = new Map<string, winston.Logger>();
interface ChalkStyle extends Function {
    (text: string | number | boolean | null | undefined): string;
}

const METHOD_COLORS: Record<string, ChalkStyle> = {
    GET: chalk.blue,
    POST: chalk.green,
    PUT: chalk.yellow,
    DELETE: chalk.red,
    PATCH: chalk.magenta,
};

const getLogger = (type: string): winston.Logger => {
    if (loggersMap.has(type)) return loggersMap.get(type)!;

    const LogConfig = (cfg?.Log || {}) as LogConfigInterface;
    const logDirectory: string = process.env.LOG_DIR || LogConfig.directory || './logs';
    const filename: string = (LogConfig.name && LogConfig.name[type]) || `${type}.log`;

    try {
        const dirPath = path.resolve(logDirectory);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (e) {
        console.error("Failed to create log directory", e);
    }

    const transport = new DailyRotateFile({
        dirname: logDirectory,
        filename: filename + '-%DATE%',
        datePattern: 'YYYY-WW', 
        zippedArchive: true, 
        frequency: process.env.LOG_ROTATION_FREQUENCY || '7d', 
        maxSize: '20m',
        maxFiles: process.env.LOG_MAX_FILES || '4w', 
        createSymlink: true, 
        symlinkName: filename 
    });

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, message }) => `${timestamp} - ${message}`)
        ),
        transports: [transport]
    });

    loggersMap.set(type, logger);
    return logger;
};



/**
 * * Writes a log message to the appropriate log file based on type
 * @param log - The log message to write
 * @param type - The type/category of the log (e.g., 'access', 'error')
 */
export const writeToLog = (log: string, type: string): void => {
    try {
        const logger = getLogger(type);
        logger.info(log);
    } catch (err) {
        console.error("Logging error:", err);
        console.log(`[${type}] ${log}`);
    }
};

/**
 * * Logs formatted messages to the console with colors and structured output
 * @param method - HTTP method or custom label (e.g., 'GET', 'POST', 'MIDDLEWARE')
 * @param route - API route or context (e.g., '/api/users')
 * @param status - 'OK' for success, 'FAIL' for failure
 * @param message - Main log message with optional placeholders
 * @param args - Additional key-value pairs for extra context
 */
export const logConsole = (
    method: string,
    route: string, 
    status: 'OK' | 'FAIL',
    message: string,
    args: Record<string, any> = {}
): void => {
    const color = METHOD_COLORS[method.toUpperCase()] || chalk.white;
    const statusColor = status === 'OK' ? chalk.green.bold : chalk.red.bold;

    let description = message;
    const extra: string[] = [];

    Object.entries(args).forEach(([key, value]) => {
        const placeholder = `{${key}}`;
        const displayValue = chalk.white.bold(value);

        if (description.includes(placeholder)) { description = description.split(placeholder).join(displayValue);
        } else {extra.push(`${chalk.grey(key)}=${chalk.white(value)}`);}
    });

    const parts = [
        color(`[${method.toUpperCase()} ${route}]`),
        statusColor(status),
        description
    ];

    if (extra.length > 0) {parts.push(chalk.grey('→'), extra.join(' '));}

    console.log(parts.join(' '));
};