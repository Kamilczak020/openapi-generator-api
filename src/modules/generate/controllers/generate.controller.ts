import { GenerateApiClientRequestBody, GenerateApiClientRequestParams } from '../dto/request';
import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common';
import { OpenAPICliService } from 'src/modules/shared/services';
import { EnumerateGeneratorsResponse } from '../dto/response';
import { ApiResponse } from '@nestjs/swagger';
import { Readable } from 'stream';

@Controller('generate')
export class GenerateController {
  public constructor(private readonly cliService: OpenAPICliService) { }

  @Get('/generators')
  @ApiResponse({ status: 200, type: EnumerateGeneratorsResponse })
  public async getGenerators() {
    const generators = this.cliService.enumerateGenerators();
    return { generators };
  }

  @Post('/:generator')
  public async generate(
    @Param() params: GenerateApiClientRequestParams,
    @Body() body: GenerateApiClientRequestBody,
  ) {
    const zipStream = await this.cliService.generate({
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
