import { Module, Global } from '@nestjs/common';
import { WinstonModuleOptions } from './interfaces';

@Global()
@Module({})
export class LoggerModule {
  public static forRoot(options: Partial<WinstonModuleOptions>) {

  }
}
