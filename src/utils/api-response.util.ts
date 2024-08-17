import { HttpException, HttpStatus } from '@nestjs/common';

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

export function throwApiResponse(responseDto: ResponseDTO) {
  throw new HttpException(responseDto, responseDto.status);
}
