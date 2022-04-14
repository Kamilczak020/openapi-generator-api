import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CodegenService } from '../services';

@Controller('generate')
export class GenerateController {
  public constructor(private readonly codegenService: CodegenService) { }

  @Get('/generators')
  public async getGenerators() {
    return this.codegenService.enumerateGenerators();
  }

  @Post('/:generator')
  public async generate(
    @Req() request: GenerateApiClientRequestParams,
    @Body() body: GenerateApiClientRequestBody,
  ) {
    return this.codegenService.generate({
      generatorOptions: body.generatorOptions,
      cliOptions: body.cliOptions,
      generator: request.generator,
      schema: body.schema,
    });
  }
}
