const config = require('config');
const path = require('path');
const LogConfig = config.get("Log")
const fs = require('fs');

/**
 * Write a log entry to a log file.
 *
 * @param {string} log - The log message to be written.
 * @param {string} type - The type or category of the log message.
 */

const writeToLog = (log, type) => {
    const logDirectory = LogConfig.directory; 
    const logFilePath = path.join(logDirectory, LogConfig.name[type]); 

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    let existingLog = '';
    try {
        existingLog = fs.readFileSync(logFilePath, 'utf8');
    } catch (err) {}

    const logEntry = `${new Date().toISOString()} - ${log}\n`;
    const newLog = logEntry + existingLog;

    const lines = newLog.split('\n');
    if (lines.length > LogConfig.maxLine) {
        lines.pop();
    }

    fs.writeFileSync(logFilePath, lines.join('\n'), 'utf8');
}

module.exports = { writeToLog };