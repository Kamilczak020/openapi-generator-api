import { Body, Controller, Get, Req } from '@nestjs/common';
import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';

@Controller('gen')
export class CodegenController {
  @Get('/')
  public async generate(
    @Req() request: GenerateApiClientRequestParams,
    @Body() body: GenerateApiClientRequestBody,
  ) {
    return 'Hello World!';
  }
}
