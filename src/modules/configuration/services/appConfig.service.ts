import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  public constructor(private readonly configService: ConfigService) { }

  public get port() {
    return parseInt(this.configService.get<string>('APP_PORT'), 10);
  }

  public get isProduction() {
    const environment = this.configService.get<string>('ENVIRONMENT');
    return environment === 'production';
  }
}
