import { Injectable } from '@nestjs/common';
import { GeneratorConfigService } from '../../configuration/services';

@Injectable()
export class CodegenService {
  public constructor(private readonly configService: GeneratorConfigService) { }
}
