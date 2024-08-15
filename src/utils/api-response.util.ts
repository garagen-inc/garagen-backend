import { HttpStatus } from '@nestjs/common';

export class ResponseDTO {
  status: HttpStatus;
  devMessage: string;
  message: string;
  data: any;

  constructor(status: HttpStatus, devMessage: string, message: string, data?: any) {
    this.status = status;
    this.devMessage = devMessage;
    this.message = message;
    if (data) this.data = data;
  }
}
