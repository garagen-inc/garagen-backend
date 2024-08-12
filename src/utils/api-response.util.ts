import { HttpException, HttpStatus } from '@nestjs/common';

export function createApiResponse(
  status: HttpStatus,
  devMessage: string,
  message: string,
  data?: any,
) {
  throw new HttpException(
    {
      statusCode: status,
      devMessage,
      message,
      data,
    },
    status,
  );
}
