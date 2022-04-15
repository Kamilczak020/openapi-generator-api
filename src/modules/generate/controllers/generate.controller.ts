import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { Body, Controller, Get, Param, Post, Res, StreamableFile } from '@nestjs/common';
import { CodegenService } from '../services';
import { Readable } from 'stream';

@Controller('generate')
export class GenerateController {
  public constructor(private readonly codegenService: CodegenService) { }

  @Get('/generators')
  public async getGenerators() {
    return this.codegenService.enumerateGenerators();
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
