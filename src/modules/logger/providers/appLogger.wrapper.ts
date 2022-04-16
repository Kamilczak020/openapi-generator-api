import { Injectable, LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
import { APP_LOGGER_PREFIX } from '../constants';
import { UseLogger } from '../decorators';

@Injectable()
export class AppLoggerWrapper implements LoggerService {
  public constructor(
    @UseLogger(APP_LOGGER_PREFIX)
    private readonly winstonLogger: Logger,
  ) { }

  public log(message: string) {
    this.winstonLogger.info(message);
  }

  public warn(message: string) {
    this.winstonLogger.warn(message);
  }

  public error(message: string) {
    this.winstonLogger.error(message);
  }
}
