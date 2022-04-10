import { appConfigSchema, generatorConfigSchema } from '../../configuration';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfigService, GeneratorConfigService } from './services';


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...generatorConfigSchema,
      }),
    }),
  ],
  providers: [
    AppConfigService,
    GeneratorConfigService,
  ],
  exports: [
    AppConfigService,
    GeneratorConfigService,
  ],
})
export class ConfigurationModule { }
