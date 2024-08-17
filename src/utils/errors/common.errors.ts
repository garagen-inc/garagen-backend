import { HttpStatus } from '@nestjs/common';
import { ExceptionReasonDTO } from '../dtos/exception-reason.dto';
import { ExceptionDTO } from '../dtos/exception.dto';

export const UnauthorizedError = ExceptionDTO.withError(
  'Unauthorized',
  new ExceptionReasonDTO('Permissions', 'User lacks the required permissions', 'Usuário não tem permissão para acessar o recurso'),
  HttpStatus.UNAUTHORIZED,
);
export const InternalServerError = ExceptionDTO.withError('Internal server error', new ExceptionReasonDTO('Unexpected error', 'internal server error'), HttpStatus.INTERNAL_SERVER_ERROR);
