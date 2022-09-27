import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { getTime } from 'date-fns';
import { Request, Response } from 'express';
import { Logger } from 'winston';
import { UseLogger } from '../../logger/decorators';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public constructor(
    @UseLogger('HttpExceptionFilter')
    private readonly logger: Logger,
  ) {}

  public async catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const baseResponseParams = {
      timestamp: getTime(new Date()),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      this.logger.error(exception.message, { stack: exception.stack });
      response.status(exception.getStatus()).json({
        ...baseResponseParams,
        message: exception.message,
      });
    } else {
      this.logger.error(exception as any, {});
      response.status(500).json({
        ...baseResponseParams,
        message: 'Internal server error.',
      });
    }
  }
}
