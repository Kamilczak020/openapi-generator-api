import { GENERATE_CLI_FLAG_NAME_METADATA } from '../constants';
import 'reflect-metadata';

export const getCliFlagNames = (target: any): Map<string, string> => Reflect.getMetadata(
  GENERATE_CLI_FLAG_NAME_METADATA,
  target,
);

export const GenerateCliFlagName = (name: string) => {
  return (target: object, propertyKey: string) => {
    const currentFlagNames: Map<string, string> = getCliFlagNames(target) || new Map();

    const newFlagNames = currentFlagNames.set(propertyKey, name);
    Reflect.defineMetadata(
      GENERATE_CLI_FLAG_NAME_METADATA,
      newFlagNames,
      target,
    );
  };
};
