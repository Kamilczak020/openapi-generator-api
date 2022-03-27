import * as Joi from 'joi';

export const appConfigSchema = {
  NODE_ENV: Joi.string().required(),
};
