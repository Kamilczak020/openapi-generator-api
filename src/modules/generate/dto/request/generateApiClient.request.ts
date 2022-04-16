import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsJSON, IsEnum, ValidateNested } from 'class-validator';
import { GeneratorKind } from '../../constants';
import { CliGenerateOptions } from '../helpers';

export class GenerateApiClientRequestParams {
  @IsEnum(GeneratorKind)
  @ApiProperty({
    type: 'enum',
    enum: GeneratorKind,
    enumName: 'GeneratorKind',
    description: 'Type of generator to be used.',
  })
  public readonly generator: GeneratorKind;
}

export class GenerateApiClientRequestBody {
  @IsObject()
  @ApiProperty({
    type: Object,
    description: `Options to pass to the code generator. \
    For available options & docs go to https://openapi-generator.tech/docs/generators.`,
  })
  public readonly generatorOptions: Record<string, any>;

  @ValidateNested()
  @ApiProperty({
    type: CliGenerateOptions,
    description: `Options to pass to the cli generate function. \
    Synonymous with flags, with a few exceptions.`,
  })
  public readonly cliOptions: CliGenerateOptions;

  @IsJSON()
  @ApiProperty({
    description: 'OpenAPI Schema to use for generating code.',
  })
  public readonly schema: string;
}
