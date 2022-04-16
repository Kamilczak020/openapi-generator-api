import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get title() {
    return this.configService.get<string>('SWAGGER_TITLE')
      || 'OpenAPI Generator API';
  }

  public get description() {
    return this.configService.get<string>('SWAGGER_DESCRIPTION')
      || 'An easy to work with API layer to "openapi-generator-cli."';
  }

  public get version() {
    return this.configService.get<string>('SWAGGER_VERSION')
      || '3.0';
  }

  public get path() {
    return this.configService.get<string>('SWAGGER_PATH')
      || 'api';
  }

  public get schemaFilePath() {
    return this.configService.get<string>('OPENAPI_SCHEMA_FILE_PATH')
      || './schemas/oas3.yaml';
  }
}
