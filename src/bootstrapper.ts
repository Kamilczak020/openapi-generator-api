import { AppConfigService } from './modules/configuration/services';
import { AppLoggerWrapper } from './modules/logger/providers';
import { SwaggerBootstrapper } from './modules/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';

export abstract class Bootstrapper {
  public static async bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const appLogger = app.get(AppLoggerWrapper);
    app.useLogger(appLogger);
    app.flushLogs();
    const appConfigService = app.get(AppConfigService);

    await SwaggerBootstrapper.bootstrap(app);
    await app.listen(appConfigService.port);
  }
}
