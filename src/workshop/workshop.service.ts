import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';
import { AddressDTO } from 'src/address/dtos/address.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopEntity: Repository<WorkshopEntity>,
  ) {}

  async list(): Promise<WorkshopDTO[]> {
    const workshops = await this.workshopEntity.find();
    return workshops.map((w) => {
      return new WorkshopDTO(w.id, w.name, w.description, w.address);
    });
  }
}
