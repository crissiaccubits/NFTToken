import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import config from '../config/logOptions';

let transportOptions = null;
const file = config.jsonFormat ? config.jsonFile : config.textFile;

const alignFormat = format.printf(({ timestamp, level, message, stack }) => {
  if (stack) {
    return `${timestamp} : [ ${level} ] : ${message}\n${stack}`;
  }
  return `${timestamp} : [ ${level} ] : ${message}`;
});

  transportOptions = [
    new DailyRotateFile(file),
    new transports.Console({
      format: format.combine(format.errors({ stack: true }), format.colorize(), alignFormat),
    }),
  ];


const logger = createLogger({
  level: config.level,
  format: config.jsonFormat
    ? format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json()
      )
    : format.combine(
        format.errors({ stack: true }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        alignFormat
      ),
  transports: transportOptions,
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.http(message);
  },
};

module.exports = logger;
