import { ContextInjectorMiddleware } from './middleware';
import { ValidateModule } from '../validate/validate.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration';
import { SharedModule } from '../shared/shared.module';
import { GenerateModule } from '../generate';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigurationModule,
    ValidateModule,
    GenerateModule,
    SharedModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextInjectorMiddleware).forRoutes('*');
  }
}
