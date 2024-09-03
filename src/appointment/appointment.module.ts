import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { AppointmentService } from './appointment.service';
import { AvailableSlotEntity } from 'src/available-slot/available-slot.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, AvailableSlotEntity, UserEntity])],
  providers: [AppointmentService],
  //   controllers: [WorkshopController],
})
export class AppointmentModule {}
