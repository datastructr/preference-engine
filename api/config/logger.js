import winston from 'winston';
import path from 'path';

winston.emitErrs = true;

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: path.resolve(__dirname, './logs/all-logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new (winston.transports.File)({
      name: 'error-file',
      level: 'error',
      filename: path.resolve(__dirname, './logs/errors.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

export default logger;
export const stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};