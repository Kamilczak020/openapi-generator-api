import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestScopeInjectorMiddleware } from './middleware';
import { LoggerModule } from '../logger';

@Module({
  imports: [LoggerModule],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestScopeInjectorMiddleware).forRoutes('*');
  }
}
