import { Module } from '@nestjs/common';
import { CodegenService } from './services';
import { CodegenController } from './controllers';

@Module({
  controllers: [CodegenController],
  providers: [CodegenService],
})
export class CodegenModule { }
