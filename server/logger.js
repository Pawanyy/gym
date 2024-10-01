import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs/promises';

const logDirectory = path.join('logs');

// Function to create log directory if it doesn't exist
const createLogDirectory = async () => {
  try {
    await fs.mkdir(logDirectory, { recursive: true });
  } catch (error) {
    console.error(`Failed to create log directory: ${error.message}`);
  }
};

const customFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}\n`;
});

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logDirectory, '%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'debug',
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        customFormat
      ),
    }),
    transport,
  ],
});

createLogDirectory();

export default logger;
