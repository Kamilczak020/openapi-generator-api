import { Global, Module } from '@nestjs/common';
import { ValidateController } from './controllers';

@Global()
@Module({
  controllers: [ValidateController],
})
export class ValidateModule { }
