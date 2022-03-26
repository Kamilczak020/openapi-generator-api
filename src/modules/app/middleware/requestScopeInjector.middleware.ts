import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext, requestContextAsyncLocalStorage } from '../contexts';

@Injectable()
export class RequestScopeInjectorMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const requestContext = new RequestContext();
    requestContextAsyncLocalStorage.run(requestContext, () => {
      next();
    });
  }
}
