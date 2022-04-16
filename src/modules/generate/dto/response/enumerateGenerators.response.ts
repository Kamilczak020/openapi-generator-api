import { ApiProperty } from '@nestjs/swagger';
import { GeneratorKind } from '../../constants';

export class EnumerateGeneratorsResponse {
  @ApiProperty({
    type: 'enum',
    enum: GeneratorKind,
    enumName: 'GeneratorKind',
    description: 'Types of available generators.',
    isArray: true,
  })
  public readonly generators: Array<GeneratorKind>;
}
