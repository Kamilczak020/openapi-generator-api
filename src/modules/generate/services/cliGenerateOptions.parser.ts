import { InternalServerErrorException } from '@nestjs/common';
import { UnsupportedException } from 'src/modules/shared/exceptions';
import { exists } from 'src/util';
import { getCliFlagNames } from '../decorators';
import { CliGenerateOptions } from '../dto/helpers';

export abstract class CliGenerateOptionsParser {
  public static getCliFlagsAndValues(options: CliGenerateOptions) {
    const cliFlags = getCliFlagNames(options);

    const cliFlagsAndValues = [];
    const propNames = Object.getOwnPropertyNames(options);
    for (const propName of propNames) {
      this.checkForUnsupportedFlags(propName);

      const flagName = cliFlags.get(propName);
      if (!exists(flagName)) {
        throw new InternalServerErrorException(
          `No flag name defined for ${propName}`,
        );
      }

      const flagValuePair = [flagName, options[propName]];
      cliFlagsAndValues.push(flagValuePair);
    }

    return cliFlagsAndValues;
  }

  private static checkForUnsupportedFlags(propName: string) {
    const unsupportedProperties = [
      'languageSpecificPrimitives',
      'reservedWordsMappings',
      'additionalProperties',
      'instantiationTypes',
      'ignoreFileOverride',
      'globalProperties',
      'serverVariables',
      'importMappings',
      'typeMappings',
    ];

    if (unsupportedProperties.includes(propName)) {
      throw new UnsupportedException(`${propName} is not yet supported.`);
    }
  }
}
