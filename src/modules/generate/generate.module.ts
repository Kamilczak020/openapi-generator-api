import { Module } from '@nestjs/common';
import { CodegenService } from './services';
import { GenerateController } from './controllers';

@Module({
  controllers: [GenerateController],
  providers: [CodegenService],
})
export class GenerateModule { }
