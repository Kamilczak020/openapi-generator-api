import { DynamicModule } from '@nestjs/common';
import { AppLoggerWrapper, createLoggerProviders } from './providers';

export class LoggerModule {
  public static forRoot(): DynamicModule {
    const loggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [
        ...loggerProviders,
        AppLoggerWrapper,
      ],
      exports: [
        ...loggerProviders,
        AppLoggerWrapper,
      ],
      global: true,
    };
  }
}
