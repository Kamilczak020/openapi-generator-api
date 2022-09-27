import { ValidateSchemaRequestBody } from '../dto/request';
import { ValidateSchemaResponse } from '../dto/response';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ValidatorCliService } from '../services/validatorCli.service';

@Controller('validate')
export class ValidateController {
  public constructor(private readonly cliService: ValidatorCliService) { }

  @Post('/')
  @ApiResponse({ status: 200, type: ValidateSchemaResponse })
  public async generate(@Body() body: ValidateSchemaRequestBody) {
    const isValid = await this.cliService.validate({
      schema: body.schema,
    });

    return { isValid };
  }
}
