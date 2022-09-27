import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/exception.filter';
import { CliDiskService } from './services/cliDisk.service';

@Global()
@Module({
  providers: [
    CliDiskService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [
    CliDiskService,
  ],
})
export class SharedModule { }
