import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/api-response.util';
import { AvailableSlotService } from './available-slot.service';

@Controller('available-slot')
export class AvailableSlotController {
  constructor(private readonly availableSlotService: AvailableSlotService) {}

  @Get()
  async list() {
    return new ResponseDTO(HttpStatus.OK, 'Available slots has been listed', 'Horários disponíveis listadas com sucesso', await this.availableSlotService.list());
  }

  @Get('workshop/:workshopId')
  async getByWorkshopId(@Param('workshopId') workshopId: number) {
    return new ResponseDTO(HttpStatus.OK, 'Available slots has been listed', 'Horários disponíveis listadas com sucesso', await this.availableSlotService.getByWorkshop(workshopId));
  }
}
