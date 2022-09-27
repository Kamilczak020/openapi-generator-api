import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './request.context';

// the new, node-native way of doing this, so that cls-hooks can go disappear
export const requestContextAsyncLocalStorage = new AsyncLocalStorage<RequestContext>();
export const getRequestContext = () => requestContextAsyncLocalStorage.getStore();
