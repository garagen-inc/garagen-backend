import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';
import { EditWorkshopDTO } from './dtos/update-workshop.dto';

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

  async update(editWorkshopDto: EditWorkshopDTO): Promise<WorkshopDTO | null> {
    const { workshopId, name, description } = editWorkshopDto;
    const workshop = await this.workshopEntity.findOne({
      where: { id: workshopId },
    });

    if (!workshop) {
      return null;
    }

    workshop.name = name;
    workshop.description = description;

    await this.workshopEntity.save(workshop);

    const workshopUpdated = await this.workshopEntity.findOne({
      where: { id: workshopId },
      relations: ['address'],
    });
    return new WorkshopDTO(workshopUpdated.id, workshopUpdated.name, workshopUpdated.description, workshopUpdated.address);
  }
}
