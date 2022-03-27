import { WinstonModuleOptions } from '../interfaces';
import { Provider } from '@nestjs/common';

export abstract class WinstonModuleProvider {
  public static createProviders(options: Partial<WinstonModuleOptions>): Array<any> {
    return [
      {
      },
    ];
  }
}
