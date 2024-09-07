import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
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

  @Get('/:workshopId')
  @JWT(false)
  async single(@Param('workshopId') workshopId: number) {
    const workshop = await this.workshopService.single(workshopId);
    if (!workshop) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, 'Failed to find workshop', 'Falha ao encontrar oficina');
    }
    return new ResponseDTO(HttpStatus.OK, 'Workshop details fetch successfully', 'Oficina encontrada com sucesso', workshop);
  }
}
