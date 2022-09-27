import { Global, Module } from '@nestjs/common';
import { ValidateController } from './controllers';
import { ValidatorCliService } from './services/validatorCli.service';

@Global()
@Module({
  controllers: [ValidateController],
  providers: [
    ValidatorCliService,
  ],
})
export class ValidateModule { }
