import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { CliGenerateOptionsParser } from './cliGenerateOptions.parser';
import { GeneratorConfigService } from '../../configuration/services';
import { HttpStatus, Injectable } from '@nestjs/common';
import { getRequestContext } from '../../app/contexts';
import { CliGenerateOptions } from '../dto/helpers';
import { UseLogger } from '../../logger/decorators';
import { CodegenException } from '../exceptions';
import { GeneratorKind } from '../constants';
import { createWriteStream } from 'fs';
import { spawn } from 'child_process';
import { Logger } from 'winston';
import jsZip from 'jszip';

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
    const { generatorOptions, cliOptions, generator, schema } = options;
    const schemaFile = await this.writeSchemaToDisk(schema);

    // TODO - sanitize generator input

    const outputDirectory = await this.spawnGenerator(
      generatorOptions,
      cliOptions,
      generator,
      schemaFile,
    );

    const zip = new jsZip();
    zip.folder(outputDirectory);

    return zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true,
    });
  }

  private async spawnGenerator(
    generatorOptions: Record<string, any>,
    cliOptions: CliGenerateOptions,
    generator: GeneratorKind,
    schemaFile: string,
  ) {
    const flagsAndValues = CliGenerateOptionsParser
      .getCliFlagsAndValues(cliOptions);

    return new Promise<string>((resolve, reject) => {
      const process = spawn('openapi-generator-cli', [
        'generate',
        '-i', schemaFile,
        '-g', generator,
        '-c', JSON.stringify(generatorOptions),
        '-o', this.configService.outputDirectory,
        ...flagsAndValues.flat(),
      ]);

      process.addListener('error', (error) => {
        process.disconnect();
        reject(new CodegenException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ));
      });

      process.addListener('close', () => {
        this.logger.info('Generator process finished and successfully closed.');
        resolve(this.configService.outputDirectory);
      });
    });
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
