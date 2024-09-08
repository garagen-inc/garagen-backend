import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AddressEntity } from 'src/address/address.entity';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { AvailableSlotEntity } from 'src/available-slot/available-slot.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity])],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthService],
})
export class UserModule {}
