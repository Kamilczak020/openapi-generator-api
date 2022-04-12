import * as Joi from 'joi';

export const appConfigSchema = {
  NODE_ENV: Joi.string().required(),
  APP_PORT: Joi.number().required(),
};
