import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '../contexts/request.context';
import { CliDiskService } from '../../shared/services/cliDisk.service';
import { requestContextAsyncLocalStorage } from '../contexts/requestContext.asyncLocalStorage';

@Injectable()
export class ContextInjectorMiddleware implements NestMiddleware {
  public constructor(private readonly diskService: CliDiskService) {
  }

  public async use(req: Request, res: Response, next: NextFunction) {
    const requestContext = new RequestContext(this.diskService);

    requestContextAsyncLocalStorage.run(requestContext,  () => {
      requestContext.prepareRequestFiles();
      next();
    });
  }
}
