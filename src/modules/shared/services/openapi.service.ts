import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from 'src/modules/generate/dto/request';
import { ValidateSchemaRequestBody } from 'src/modules/validate/dto/request';
import { CliGenerateOptionsParser } from 'src/modules/generate/services';
import { GeneratorConfigService } from '../../configuration/services';
import { CodegenException } from 'src/modules/generate/exceptions';
import { GeneratorKind } from 'src/modules/generate/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UseLogger } from '../../logger/decorators';
import * as shellEscape from 'shell-escape';
import { CliOperation } from '../constants';
import { spawn } from 'child_process';
import { Logger } from 'winston';
import { CliDiskService } from './cliDisk.service';

@Injectable()
export abstract class OpenApiCliService {
  public constructor(
    @UseLogger('CodegenService')
    protected readonly logger: Logger,
    protected readonly configService: GeneratorConfigService,
    protected readonly cliDiskService: CliDiskService,
  ) { }

  public enumerateGenerators() {
    return Object.values(GeneratorKind);
  }

  protected spawnCLI(operation: CliOperation, flagsAndValues: Array<string>) {
    return new Promise<void>((resolve, reject) => {
      const process = spawn('openapi-generator-cli', [
        operation,
        shellEscape(flagsAndValues),
      ]);

      process.stdout.setEncoding('utf8');
      process.stdout.on('data', (data) => {
        console.log(data);
      });

      process.stderr.setEncoding('utf8');
      process.stderr.on('data', (data) => {
        process.removeAllListeners();

        reject(new CodegenException(
          data,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ));
      });

      process.addListener('close', () => {
        this.logger.info('CLI process finished and successfully closed.');
        resolve();
      });
    });
  }
}
