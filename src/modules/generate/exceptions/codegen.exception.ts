import { HttpException, HttpStatus } from '@nestjs/common';

export class CodegenException extends HttpException {
  public constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
