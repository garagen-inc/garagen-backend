import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/address/address.entity';
import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { WorkshopService } from './workshop.service';
import { WorkshopController } from './workshop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopEntity, AppointmentEntity, AddressEntity])],
  providers: [WorkshopService],
  controllers: [WorkshopController],
})
export class WorkshopModule {}
