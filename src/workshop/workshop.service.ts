import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private readonly workshopEntity: Repository<WorkshopEntity>,
  ) {}

  async list(): Promise<WorkshopDTO[]> {
    const workshops = await this.workshopEntity.find({ relations: ['address'] });
    return workshops.map((w) => {
      return new WorkshopDTO(w.id, w.name, w.description, w.address);
    });
  }

  async single(workshopId: number): Promise<WorkshopDTO | null> {
    const workshop = await this.workshopEntity.findOne({ relations: ['address'], where: { id: workshopId } });
    if (!workshop) return null;
    return new WorkshopDTO(workshop.id, workshop.name, workshop.description, workshop.address);
  }
}
