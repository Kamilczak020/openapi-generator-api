import { Module } from '@nestjs/common';
import { GenerateController } from './controllers';
import { GeneratorCliService } from './services/generatorCli.service';

@Module({
  controllers: [GenerateController],
  providers: [GeneratorCliService],
})
export class GenerateModule { }
