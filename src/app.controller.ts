import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/api-response.util';
import { JWT } from './decorators/jwt.decorator';

@Controller()
export class AppController {
  @JWT(false)
  @Get('health-check')
  async check() {
    return new ResponseDTO(HttpStatus.OK, 'Application is running', 'Aplicação disponível', { healthy: true });
  }
}
