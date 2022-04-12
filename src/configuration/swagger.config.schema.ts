import * as Joi from 'joi';

export const swaggerConfigSchema = {
  SWAGGER_TITLE: Joi.string().optional(),
  SWAGGER_DESCRIPTION: Joi.string().optional(),
  SWAGGER_VERSION: Joi.string().optional(),
  SWAGGER_PATH: Joi.string().optional(),
  OPENAPI_SCHEMA_FILE_PATH: Joi.string().optional(),
};
