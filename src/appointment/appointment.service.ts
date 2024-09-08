import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Raw, Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AvailableSlotEntity } from '../available-slot/available-slot.entity';
import { AppointmentDTO } from './dtos/appointment.dto';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { AvailableSlotDay } from 'src/available-slot/interfaces/available-slot-day.interface';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,

    @InjectRepository(AvailableSlotEntity)
    private readonly availableSlotRepository: Repository<AvailableSlotEntity>,
  ) {}

  private getDate(availableSlot: AvailableSlotEntity, start_time: string, final_time: string, day: AvailableSlotDay) {
    const dayMap = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };
    const dayNumber = dayMap[day];

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const difference = dayNumber - currentDay;

    const appointmentDate = new Date(currentDate);
    appointmentDate.setDate(currentDate.getDate() + difference);

    const slotStartTime = new Date(appointmentDate);
    slotStartTime.setHours(parseInt(availableSlot.startTime.split(':')[0]), parseInt(availableSlot.startTime.split(':')[1]), 0);

    const slotFinalTime = new Date(appointmentDate);
    slotFinalTime.setHours(parseInt(availableSlot.finalTime.split(':')[0]), parseInt(availableSlot.finalTime.split(':')[1]), 0);

    const appointmentStartTime = new Date(appointmentDate);
    appointmentStartTime.setHours(parseInt(start_time.split(':')[0]), parseInt(start_time.split(':')[1]), 0);

    const appointmentFinalTime = new Date(appointmentDate);
    appointmentFinalTime.setHours(parseInt(final_time.split(':')[0]), parseInt(final_time.split(':')[1]), 0);

    return { slotStartTime, slotFinalTime, appointmentStartTime, appointmentFinalTime };
  }

  async createAppointment(createAppointmentDTO: CreateAppointmentDTO): Promise<AppointmentDTO> {
    const { start_time, final_time, user_id, workshop_id, day, appointment_date } = createAppointmentDTO;

    const availableSlot = await this.availableSlotRepository.findOne({
      where: { workshopId: workshop_id, day },
    });

    if (!availableSlot) {
      throw new BadRequestException('Available slot not found for the specified day');
    }

    const { slotStartTime, slotFinalTime, appointmentStartTime, appointmentFinalTime } = this.getDate(availableSlot, start_time, final_time, day);

    if (appointmentStartTime < slotStartTime || appointmentFinalTime > slotFinalTime || appointmentStartTime >= appointmentFinalTime) {
      throw new BadRequestException('Appointment time is outside the available slot range');
    }
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        workshop_id,
        appointment_date,
        start_time: Raw((alias) => `TIME(${alias}) < TIME(:appointmentFinalTime)`, { appointmentFinalTime }),
        final_time: Raw((alias) => `TIME(${alias}) > TIME(:appointmentStartTime)`, { appointmentStartTime }),
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('The available slot is already occupied');
    }
    const appointmentEntity = this.appointmentRepository.create({
      start_time,
      final_time,
      user_id,
      workshop_id,
      appointment_date,
    });

    const savedAppointment = await this.appointmentRepository.save(appointmentEntity);
    const appointment = await this.appointmentRepository.findOne({ where: { id: savedAppointment.id }, relations: ['user'] });

    return new AppointmentDTO(appointment.id, appointment.start_time, appointment.final_time, appointment.user_id, appointment.user.name, appointment.workshop_id, appointment.appointment_date);
  }

  async list(workshopId: number) {
    const appointmentEntities = await this.appointmentRepository.find({ where: { workshop_id: workshopId }, relations: ['user'] });
    return appointmentEntities.map(
      (appointment) =>
        new AppointmentDTO(appointment.id, appointment.start_time, appointment.final_time, appointment.user_id, appointment.user.name, appointment.workshop_id, appointment.appointment_date),
    );
  }

  async findOne(appointmentId: number) {
    const appointmentEntity = await this.appointmentRepository.findOne({ where: { id: appointmentId }, relations: ['user'] });
    if (!appointmentEntity) return undefined;
    return new AppointmentDTO(
      appointmentEntity.id,
      appointmentEntity.start_time,
      appointmentEntity.final_time,
      appointmentEntity.user_id,
      appointmentEntity.user.name,
      appointmentEntity.workshop_id,
      appointmentEntity.appointment_date,
    );
  }

  async delete(appointmentId: number) {
    const appointmentEntity = await this.appointmentRepository.findOne({ where: { id: appointmentId } });
    if (!appointmentEntity) return false;
    await this.appointmentRepository.delete(appointmentEntity);
    return true;
  }
}
