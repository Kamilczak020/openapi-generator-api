import 'reflect-metadata';
import { getLoggerInjectionIdentifier, LOGGER_PREFIX_METADATA } from '../constants';
import { Inject } from '@nestjs/common';

export const UseLogger = (prefix: string) => {
  const existingMetadata: Set<string> = Reflect.getMetadata(LOGGER_PREFIX_METADATA, Reflect) || new Set();
  const injectionIdentifier = getLoggerInjectionIdentifier(prefix);
  existingMetadata.add(prefix);

  Reflect.defineMetadata(LOGGER_PREFIX_METADATA, existingMetadata, Reflect);
  return Inject(injectionIdentifier);
};
