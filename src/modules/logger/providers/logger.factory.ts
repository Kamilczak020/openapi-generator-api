import { createLogger, format, transports } from 'winston';
import { LoggerLevel, loggerLevelColors } from '../constants';
import * as winston from 'winston';

winston.addColors(loggerLevelColors.colors);

const { printf, combine, json } = format;
const developmentFormat = printf(({ level, label, timestamp, message }) => {
  return `[${level}] [${label}] [${timestamp}]: ${message}`;
});

export const winstonLoggerFactory = (isProduction: boolean, prefix: string) => {
  const logger = createLogger({
    levels: loggerLevelColors.levels,
    level: isProduction ? LoggerLevel.Info : LoggerLevel.Debug,
    transports: [new transports.Console()],
    format: combine(
      format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })(),
      format.label({ label: prefix }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      isProduction ? null : format.colorize({ all: true }),
      isProduction ? json() : developmentFormat,
      format.splat(),
    ),
  });

  return logger;
};
