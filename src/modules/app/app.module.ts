import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RequestScopeInjectorMiddleware } from './middleware';
import { ConfigurationModule } from '../configuration';
import { CodegenModule } from '../codegen';
import { LoggerModule } from '../logger';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigurationModule,
    CodegenModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestScopeInjectorMiddleware).forRoutes('*');
  }
}
