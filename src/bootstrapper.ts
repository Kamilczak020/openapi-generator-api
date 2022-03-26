import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';

export abstract class Bootstrapper {
  public static async bootstrap() {
    const app = await NestFactory.create(AppModule);
  }
}
