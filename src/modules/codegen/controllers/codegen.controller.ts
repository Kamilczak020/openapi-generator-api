import { Body, Controller, Get } from '@nestjs/common';
import { GenerateApiClientRequest } from '../dto/request/generateApiClient.request';

@Controller('codegen')
export class CodegenController {
  @Get('/')
  public async generate(@Body() request: GenerateApiClientRequest) {
    
  }
}
