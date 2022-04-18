import { Global, Module } from '@nestjs/common';
import { OpenAPICliService } from './services';

@Global()
@Module({
  providers: [
    OpenAPICliService,
  ],
  exports: [
    OpenAPICliService,
  ],
})
export class SharedModule { }
