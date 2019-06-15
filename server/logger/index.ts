import winston from 'winston';
import * as env from 'env-var';

const getTransports = () => {
    if (process.env.NODE_ENV === 'test') {
        return [new winston.transports.File({ filename: 'test.log', format: fileFormat })];
    } else if (process.env.NODE_ENV === 'production') {
        return [
            new winston.transports.Console({ format: consoleFormat }),
            new winston.transports.File({ filename: 'app.log', format: fileFormat }),
        ];
    } else {
        return [
            new winston.transports.Console({ format: consoleFormat }),
            new winston.transports.File({ filename: 'dev.log', format: fileFormat }),
        ];
    }
};

const consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(log => {
        return winston.format.colorize().colorize(log.level, `${log.timestamp} [ ${log.level} ]\t${log.message}`);
    }),
);

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(log => {
        return `${log.timestamp} [ ${log.level} ]\t${log.message}`;
    }),
);

const logger = winston.createLogger({
    transports: getTransports(),
});

// Set up logging levels
if (env.get('NODE_ENV').asString() !== 'production') {
    logger.level = 'debug';
} else {
    logger.level = 'info';
}

export default logger;
