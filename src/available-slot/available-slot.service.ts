import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableSlotEntity } from './available-slot.entity';
import { AvailableSlotDTO } from './dtos/available-slot.dto';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';

@Injectable()
export class AvailableSlotService {
  constructor(
    @InjectRepository(AvailableSlotEntity)
    private readonly availableSlotEntity: Repository<AvailableSlotEntity>,
  ) {}

  async list(): Promise<AvailableSlotDTO[]> {
    const availableSlots = await this.availableSlotEntity.find();
    return availableSlots.map((as) => {
      return new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.day, as.workshop);
    });
  }

  async getByWorkshop(workshopId: number): Promise<AvailableSlotDTO[]> {
    const availableSlots = await this.availableSlotEntity.find({ where: { workshopId } });
    return availableSlots.map((as) => {
      return new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.day);
    });
  }

  async createAvailableSlot(createAvailableSlot: CreateAvailableSlotDTO): Promise<AvailableSlotDTO[]> {
    const availableSlots = await this.availableSlotEntity.find({
      where: { workshopId: createAvailableSlot.workshopId },
    });

    if (availableSlots.length > 1) {
      return null;
    }

    const createdAvailableSlots: Array<AvailableSlotDTO> = [];

    for await (const day of createAvailableSlot.recurrence) {
      const availableSlotEntity = this.availableSlotEntity.create({
        startTime: createAvailableSlot.startTime,
        workshopId: createAvailableSlot.workshopId,
        finalTime: createAvailableSlot.finalTime,
        day: day,
      });
      const createdAvailableSlotEntity = await this.availableSlotEntity.save(availableSlotEntity);
      const createdAvailableSlotDTO = new AvailableSlotDTO(
        createdAvailableSlotEntity.id,
        createdAvailableSlotEntity.startTime,
        createdAvailableSlotEntity.finalTime,
        createdAvailableSlotEntity.workshopId,
        createdAvailableSlotEntity.day,
      );
      createdAvailableSlots.push(createdAvailableSlotDTO);
    }
    return createdAvailableSlots;
  }
}
