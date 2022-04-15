import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedException extends HttpException {
  public constructor(message: string) {
    super(message, HttpStatus.NOT_IMPLEMENTED);
  }
}
