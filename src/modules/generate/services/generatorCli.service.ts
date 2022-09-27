import { Injectable } from '@nestjs/common';
import { CliGenerateOptionsParser } from './cliGenerateOptions.parser';
import { CliOperation } from '../../shared/constants';
import { OpenApiCliService } from '../../shared/services';
import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { GeneratorDirectory } from '../../shared/constants/generatorFilesystem.enum';

type GenerateOptions = GenerateApiClientRequestBody & GenerateApiClientRequestParams;

@Injectable()
export class GeneratorCliService extends OpenApiCliService {
  public async generate(options: GenerateOptions) {
    const { generatorOptions, cliOptions, generator, schema } = options;
    const schemaFile = await this.cliDiskService.writeSchemaToDisk(schema);
    const generatorOptionsFile = await this.cliDiskService.writeGeneratorOptionsToDisk(generatorOptions);

    const flagsAndValues = CliGenerateOptionsParser
      .getCliFlagsAndValues(cliOptions);

    await this.spawnCLI(CliOperation.Generate, [
      '-i', schemaFile,
      '-g', generator,
      '-c', generatorOptionsFile,
      '-o', this.cliDiskService.generatedOutputDirectory,
      ...flagsAndValues.flat(),
    ]);

    return this.cliDiskService.zipDirectory(
      GeneratorDirectory.Output,
    );
  }
}
