import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
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
      return new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.workshop);
    });
  }

  async getByWorkshop(workshopId: number): Promise<AvailableSlotDTO[]> {
    const availableSlots = await this.availableSlotEntity.find({ where: { workshopId } });
    return availableSlots.map((as) => {
      return new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.workshop);
    });
  }

  async createAvailableSlot(createAvailableSlot: CreateAvailableSlotDTO): Promise<AvailableSlotDTO> {
    const availableSlots = await this.availableSlotEntity.find({
      where: { workshopId: createAvailableSlot.workshopId, startTime: Between(createAvailableSlot.startTime, createAvailableSlot.finalTime) },
    });

    if (availableSlots.length > 1) {
      return null;
    }

    const availableSlotEntity = this.availableSlotEntity.create(createAvailableSlot);
    const createdAvailableSlot = await this.availableSlotEntity.save(availableSlotEntity);
    return createdAvailableSlot;
  }
}
