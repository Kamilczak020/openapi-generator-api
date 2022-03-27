import { createLogger, format, transports } from 'winston';
import { LoggerLevel } from '../constants';

const { printf, combine, json, prettyPrint } = format;
const developmentFormat = printf(({ level, label, timestamp, message }) => {
  return `[${level}] \<${label}\> {${timestamp}}: ${message}`;
});

export const winstonLoggerFactory = (isProduction: boolean, prefix: string) => {
  return createLogger({
    level: isProduction ? LoggerLevel.Info : LoggerLevel.Debug,
    transports: [new transports.Console()],
    format: combine(
      format.label({ label: prefix }),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      isProduction ? json() : developmentFormat,
      isProduction ? null : prettyPrint(),
      format.splat(),
    ),
  });
};
