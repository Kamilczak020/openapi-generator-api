import { getLoggerInjectionIdentifier, LOGGER_PREFIX_METADATA } from '../constants';

export const Logger = (prefix: string) => {
  const existingMetadata: Set<string> = Reflect.getMetadata(LOGGER_PREFIX_METADATA, Reflect) || new Set();
  const injectionIdentifier = getLoggerInjectionIdentifier(prefix);
  existingMetadata.add(injectionIdentifier);

  Reflect.defineMetadata(LOGGER_PREFIX_METADATA, existingMetadata, Reflect);
};
