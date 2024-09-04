import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableSlotService } from './available-slot.service';
import { AvailableSlotController } from './available-slot.controller';
import { AvailableSlotEntity } from './available-slot.entity';
import { Module } from '@nestjs/common';
import { WorkshopEntity } from 'src/workshop/workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvailableSlotEntity, WorkshopEntity])],
  providers: [AvailableSlotService],
  controllers: [AvailableSlotController],
})
export class AvailableSlotModule {}
