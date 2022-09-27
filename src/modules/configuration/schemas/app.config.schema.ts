import * as Joi from 'joi';

export const appConfigSchema = {
  ENVIRONMENT: Joi.string().required(),
  APP_PORT: Joi.number().required(),
};
