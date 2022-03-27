import { LoggerLevel } from '../constants';
import { Injectable } from '@nestjs/common';
import { createLogger, Logger } from 'winston';
import { AppConfigService } from '../../configuration/services';
import { getColoredLogText, getLogLevelName } from '../helpers';
import stringify from 'json-stringify-pretty-compact';

@Injectable()
export class WinstonLoggerService {
  private readonly logger: Logger;

  public constructor(private readonly appConfigService: AppConfigService) {
    this.logger = createLogger();
  }

  public critical(message: string, data?: Record<string, any>) {
    this.log(LoggerLevel.Critical, message, data);
  }

  public error(message: string, data?: Record<string, any>) {
    this.log(LoggerLevel.Error, message, data);
  }

  public warn(message: string, data?: Record<string, any>) {
    this.log(LoggerLevel.Warn, message, data);
  }

  public info(message: string, data?: Record<string, any>) {
    this.log(LoggerLevel.Info, message, data);
  }

  public debug(message: string, data?: Record<string, any>) {
    this.log(LoggerLevel.Debug, message, data);
  }

  private log(level: LoggerLevel, message: string, data: Record<string, any>) {
    const logMessage = this.formatMessage(level, message, data);

    switch (level) {
      case LoggerLevel.Critical:
        this.logger.error(logMessage);
        break;
      case LoggerLevel.Error:
        this.logger.error(logMessage);
        break;
      case LoggerLevel.Warn:
        this.logger.warn(logMessage);
        break;
      case LoggerLevel.Info:
        this.logger.info(logMessage);
        break;
      case LoggerLevel.Debug:
        this.logger.debug(logMessage);
        break;
    }
  }

  private formatMessage(level: LoggerLevel, message: string, data?: Record<string, any>) {
    const isProduction = this.appConfigService.isProduction;
    return isProduction
      ? this.jsonFormat(level, message, data)
      : this.prettyFormat(level, message, data);
  }

  private prettyFormat(level: LoggerLevel, message: string, data?: Record<string, any>) {
    const displayLevel = getColoredLogText(level, getLogLevelName(level));
    const stringifiedData = stringify(data);
    return `[${displayLevel}] ${message}\n${stringifiedData}`;
  }

  private jsonFormat(level: LoggerLevel, message: string, data?: Record<string, any>) {
    const logData = { ...data, message, level: getLogLevelName(level) };
    return JSON.stringify(logData);
  }
}
