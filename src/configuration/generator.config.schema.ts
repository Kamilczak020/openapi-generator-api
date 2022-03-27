import * as Joi from 'joi';

export const generatorConfigSchema = {
  GENERATOR_TEMPLATES_DIR: Joi.string().optional(),
  GENERATOR_OUTPUT_DIR: Joi.string().optional(),
};
