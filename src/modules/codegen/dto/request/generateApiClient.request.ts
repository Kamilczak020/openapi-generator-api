import { IsObject, IsJSON, IsEnum } from 'class-validator';
import { GeneratorKind } from '../../constants';

export class GenerateApiClientRequestParams {
  @IsEnum(GeneratorKind)
  public readonly generator: GeneratorKind;
}

export class GenerateApiClientRequestBody {
  @IsObject()
  public readonly generatorOptions: Record<string, any>;

  @IsJSON()
  public readonly schema: string;
}
