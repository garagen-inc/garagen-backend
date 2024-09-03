import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseDTO } from 'src/utils/api-response.util';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('workshop/:workshopId')
  async list(@Param('workshopId') workshopId: number) {
    return new ResponseDTO(HttpStatus.OK, 'Appointments has been listed', 'Apontamentos listadas com sucesso', await this.appointmentService.list(workshopId));
  }

  @Post('create')
  async createAvailableSlot(@Body() body: CreateAppointmentDTO) {
    const createdAppointment = await this.appointmentService.createAppointment(body);
    if (!createdAppointment) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to create appointment', 'Falha ao criar apontamento');
    }

    return new ResponseDTO(HttpStatus.OK, 'Appointment has been created', 'Apontamento criado com sucesso', createdAppointment);
  }
}
