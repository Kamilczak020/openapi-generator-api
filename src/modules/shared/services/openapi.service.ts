import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from 'src/modules/generate/dto/request';
import { ValidateSchemaRequestBody } from 'src/modules/validate/dto/request';
import { CliGenerateOptionsParser } from 'src/modules/generate/services';
import { GeneratorConfigService } from '../../configuration/services';
import { CodegenException } from 'src/modules/generate/exceptions';
import { GeneratorKind } from 'src/modules/generate/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { getRequestContext } from '../../app/contexts';
import { UseLogger } from '../../logger/decorators';
import { CliOperation } from '../constants';
import { createWriteStream } from 'fs';
import shellEscape from 'shell-escape';
import { spawn } from 'child_process';
import { Logger } from 'winston';
import jsZip from 'jszip';

type GenerateOptions = GenerateApiClientRequestBody & GenerateApiClientRequestParams;
type ValidateOptions = ValidateSchemaRequestBody;

@Injectable()
export class OpenAPICliService {
  public constructor(
    @UseLogger('CodegenService')
    private readonly logger: Logger,
    private readonly configService: GeneratorConfigService,
  ) { }

  public enumerateGenerators() {
    return Object.values(GeneratorKind);
  }

  public async validate(options: ValidateOptions) {
    const { schema } = options;
    const schemaFile = await this.writeSchemaToDisk(schema);

    try {
      await this.spawnCLI(CliOperation.Validate, [
        '-i', schemaFile,
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async generate(options: GenerateOptions) {
    const { generatorOptions, cliOptions, generator, schema } = options;
    const schemaFile = await this.writeSchemaToDisk(schema);

    const flagsAndValues = CliGenerateOptionsParser
      .getCliFlagsAndValues(cliOptions);

    await this.spawnCLI(CliOperation.Generate, [
      '-i', schemaFile,
      '-g', generator,
      '-c', JSON.stringify(generatorOptions),
      '-o', this.configService.outputDirectory,
      ...flagsAndValues.flat(),
    ]);

    const zip = new jsZip();
    zip.folder(this.configService.outputDirectory);

    return zip.generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true,
    });
  }

  private spawnCLI(operation: CliOperation, flagsAndValues: Array<string>) {
    return new Promise<void>((resolve, reject) => {
      const process = spawn('openapi-generator-cli', [
        operation,
        shellEscape(flagsAndValues),
      ]);

      process.addListener('error', (error) => {
        process.disconnect();
        reject(new CodegenException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ));
      });

      process.addListener('close', () => {
        this.logger.info('CLI process finished and successfully closed.');
        resolve();
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
