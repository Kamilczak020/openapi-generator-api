import { OpenAPICliService } from 'src/modules/shared/services';
import { ValidateSchemaRequestBody } from '../dto/request';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('validate')
export class ValidateController {
  public constructor(private readonly cliService: OpenAPICliService) { }

  @Post('/:generator')
  public async generate(@Body() body: ValidateSchemaRequestBody) {
    const isValid = await this.cliService.validate({
      schema: body.schema,
    });

    return { isValid };
  }
}
