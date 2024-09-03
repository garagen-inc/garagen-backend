import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
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
  async createAppointment(@Body() body: CreateAppointmentDTO) {
    const createdAppointment = await this.appointmentService.createAppointment(body);
    if (!createdAppointment) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to create appointment', 'Falha ao criar apontamento');
    }

    return new ResponseDTO(HttpStatus.OK, 'Appointment has been created', 'Apontamento criado com sucesso', createdAppointment);
  }

  @Get(':appointmentId')
  async findAppointment(@Param('appointmentId') appointmentId: number) {
    const appointment = await this.appointmentService.findOne(appointmentId);
    if (!appointment) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, 'Failed to find appointment', 'Apontamento não encontrado');
    }

    return new ResponseDTO(HttpStatus.OK, 'Appointment has been found', 'Apontamento encontrado com sucesso', appointment);
  }

  @Delete(':appointmentId')
  async deleteAppointment(@Param('appointmentId') appointmentId: number) {
    const hasBeenDeleted = await this.appointmentService.delete(appointmentId);
    if (!hasBeenDeleted) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to delete appointment', 'Falha ao deletar apontamento');
    }

    return new ResponseDTO(HttpStatus.OK, 'Appointment has been deleted', 'Apontamento deletado com sucesso');
  }
}
