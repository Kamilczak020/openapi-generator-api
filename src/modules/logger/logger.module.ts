import { DynamicModule } from '@nestjs/common';
import { createLoggerProviders } from './providers';

export class LoggerModule {
  public static forRoot(): DynamicModule {
    const loggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [...loggerProviders],
      exports: [...loggerProviders],
      global: true,
    };
  }
}
