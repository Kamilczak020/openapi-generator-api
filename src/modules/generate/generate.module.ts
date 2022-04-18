import { Module } from '@nestjs/common';
import { GenerateController } from './controllers';

@Module({
  controllers: [GenerateController],
  providers: [],
})
export class GenerateModule { }
