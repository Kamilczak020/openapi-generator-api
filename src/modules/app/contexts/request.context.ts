import { AsyncLocalStorage } from 'async_hooks';
import * as uuid from 'uuid';

export class RequestContext {
  public readonly requestID = new uuid.v4();
}

export const requestContextAsyncLocalStorage = new AsyncLocalStorage<RequestContext>();
export const getRequestContext = () => requestContextAsyncLocalStorage.getStore();
