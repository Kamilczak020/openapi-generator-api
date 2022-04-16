import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { Body, Controller, Get, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { EnumerateGeneratorsResponse } from '../dto/response';
import { ApiResponse } from '@nestjs/swagger';
import { CodegenService } from '../services';
import { Readable } from 'stream';

@Controller('generate')
export class GenerateController {
  public constructor(private readonly codegenService: CodegenService) { }

  @Get('/generators')
  @ApiResponse({ status: 200, type: EnumerateGeneratorsResponse })
  public async getGenerators() {
    const generators = this.codegenService.enumerateGenerators();
    return { generators };
  }

  @Post('/:generator')
  public async generate(
    @Param() params: GenerateApiClientRequestParams,
    @Body() body: GenerateApiClientRequestBody,
  ) {
    const zipStream = await this.codegenService.generate({
      generatorOptions: body.generatorOptions,
      cliOptions: body.cliOptions,
      generator: params.generator,
      schema: body.schema,
    });

    return new StreamableFile(
      new Readable().wrap(zipStream),
    );
  }
}
