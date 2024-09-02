import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/api-response.util';
import { AvailableSlotService } from './available-slot.service';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';

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

  @Post('create')
  async createAvailableSlot(@Body() body: CreateAvailableSlotDTO) {
    const createdAvailableSlot = await this.availableSlotService.createAvailableSlot(body);
    if (!createdAvailableSlot) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to create available slot', 'Falha ao criar horário disponível');
    }

    return new ResponseDTO(HttpStatus.OK, 'Available slots has been listed', 'Horários disponíveis listadas com sucesso', createdAvailableSlot);
  }
}
