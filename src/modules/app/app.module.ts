import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestScopeInjectorMiddleware } from './middleware';

@Module({})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestScopeInjectorMiddleware).forRoutes('*');
  }
}
