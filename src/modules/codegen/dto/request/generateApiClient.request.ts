import { IsObject, IsJSON, IsEnum } from 'class-validator';
import { GeneratorKind } from '../../constants';

export class GenerateApiClientRequest {
  @IsObject()
  public readonly generatorOptions: Record<string, any>;

  @IsEnum(GeneratorKind)
  public readonly generator: GeneratorKind;

  @IsJSON()
  public readonly schema: string;
}
