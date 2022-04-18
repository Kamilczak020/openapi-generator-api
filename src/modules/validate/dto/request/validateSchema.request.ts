import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';

export class ValidateSchemaRequestBody {
  @IsJSON()
  @ApiProperty({
    description: 'OpenAPI Schema to use for generating code.',
  })
  public readonly schema: string;
}
