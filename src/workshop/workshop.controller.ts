import { Controller, Get, HttpStatus } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { JWT } from 'src/decorators/jwt.decorator';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  @JWT(false)
  async list() {
    return new ResponseDTO(HttpStatus.OK, 'Workshops has been listed', 'Oficinas listadas com sucesso', await this.workshopService.list());
  }
}
