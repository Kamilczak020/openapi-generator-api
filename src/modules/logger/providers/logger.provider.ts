import { APP_LOGGER_PREFIX, getLoggerInjectionIdentifier, LOGGER_PREFIX_METADATA } from '../constants';
import { AppConfigService } from '../../configuration/services';
import { winstonLoggerFactory } from './logger.factory';
import { Provider } from '@nestjs/common';
import { Logger } from 'winston';

const createLoggerProvider = (prefix: string): Provider<Logger> => {
  return {
    provide: getLoggerInjectionIdentifier(prefix),
    inject: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
      return winstonLoggerFactory(appConfigService.isProduction, prefix);
    },
  };
};

export const createLoggerProviders = (): Array<Provider<Logger>> => {
  const registeredPrefixes: Set<string> = Reflect.getMetadata(LOGGER_PREFIX_METADATA, Reflect);
  registeredPrefixes.add(APP_LOGGER_PREFIX);

  return Array.from(registeredPrefixes).map((prefix) => createLoggerProvider(prefix));
};
