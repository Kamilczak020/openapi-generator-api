import { appConfigSchema, generatorConfigSchema } from '../../configuration';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';


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
})
export class ConfigurationModule { }
