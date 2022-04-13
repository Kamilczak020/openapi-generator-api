import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { GeneratorConfigService } from '../../configuration/services';
import { getRequestContext } from '../../app/contexts';
import { GeneratorKind } from '../constants';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { spawn } from 'child_process';
import { UseLogger } from '../../logger/decorators';
import { Logger } from 'winston';

type GenerateOptions = GenerateApiClientRequestBody & GenerateApiClientRequestParams;

@Injectable()
export class CodegenService {
  public constructor(
    @UseLogger('CodegenService')
    private readonly logger: Logger,
    private readonly configService: GeneratorConfigService,
  ) { }

  public enumerateGenerators() {
    return Object.values(GeneratorKind);
  }

  public async generate(options: GenerateOptions) {
    const { schema, generator, generatorOptions } = options;
    const schemaFile = await this.writeSchemaToDisk(schema);

    await this.spawnGenerator(schemaFile, generator, generatorOptions);
  }

  private async spawnGenerator(
    schemaFile: string,
    generator: GeneratorKind,
    generatorOptions: Record<string, any>,
  ) {
    spawn('openapi-generator-cli', [
      'generate',
      '-i', schemaFile,
      '-g', generator,
      '-c', JSON.stringify(generatorOptions),
      '-o', this.configService.outputDirectory,
    ]);
  }

  private writeSchemaToDisk(schema: string) {
    const requestContext = getRequestContext();

    const fileName = `${requestContext.requestID}-schema.json`;
    const filePath = `${this.configService.tmpDirectory}/${fileName}`;
    const writeStream = createWriteStream(filePath);

    return new Promise<string>((resolve, reject) => {
      writeStream.on('finish', () => resolve(fileName));
      writeStream.on('error', reject);
      writeStream.write(schema);
      writeStream.end();
    });
  }
}
