import { Injectable } from '@nestjs/common';
import { CliOperation } from '../../shared/constants';
import { OpenApiCliService } from '../../shared/services';
import { ValidateSchemaRequestBody } from '../dto/request';

type ValidateOptions = ValidateSchemaRequestBody;

@Injectable()
export class ValidatorCliService extends OpenApiCliService {
  public async validate(options: ValidateOptions) {
    const { schema } = options;
    const schemaFile = await this.cliDiskService.writeSchemaToDisk(schema);

    try {
      await this.spawnCLI(CliOperation.Validate, [
        '-i', schemaFile,
      ]);
      return true;
    } catch (error) {
      return false;
    }
  }
}
