import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressEntity } from 'src/address/address.entity';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { AvailableSlotEntity } from 'src/available-slot/available-slot.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
