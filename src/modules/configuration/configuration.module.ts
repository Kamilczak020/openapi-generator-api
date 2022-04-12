import {
  appConfigSchema,
  swaggerConfigSchema,
  generatorConfigSchema,
} from '../../configuration';
import {
  AppConfigService,
  SwaggerConfigService,
  GeneratorConfigService,
} from './services';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...generatorConfigSchema,
        ...swaggerConfigSchema,
        ...appConfigSchema,
      }),
    }),
  ],
  providers: [
    GeneratorConfigService,
    SwaggerConfigService,
    AppConfigService,
  ],
  exports: [
    GeneratorConfigService,
    SwaggerConfigService,
    AppConfigService,
  ],
})
export class ConfigurationModule { }
