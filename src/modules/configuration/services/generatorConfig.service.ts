import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exists } from '../../../util';

@Injectable()
export class GeneratorConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get templateDirectory() {
    const configTemplateDirectory = this.configService.get('GENERATOR_TEMPLATES_DIR');
    return exists(configTemplateDirectory) ? configTemplateDirectory : '/templates';
  }

  public get outputDirectory() {
    const configOutputDirectory = this.configService.get('GENERATOR_OUTPUT_DIR');
    return exists(configOutputDirectory) ? configOutputDirectory : '/output';
  }
}
