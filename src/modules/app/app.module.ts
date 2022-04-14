import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestScopeInjectorMiddleware } from './middleware';
import { ConfigurationModule } from '../configuration';
import { GenerateModule } from '../generate';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigurationModule,
    GenerateModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestScopeInjectorMiddleware).forRoutes('*');
  }
}
