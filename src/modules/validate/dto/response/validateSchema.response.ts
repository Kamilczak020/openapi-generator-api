import { ApiProperty } from '@nestjs/swagger';

export class ValidateSchemaResponse {
  @ApiProperty({
    description: 'Is the provided OpenAPI Schema valid?',
  })
  public readonly isValid: boolean;
}
