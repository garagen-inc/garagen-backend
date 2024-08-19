import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';

export class AvailableSlotDTO {
  id: number;
  startTime: Date;
  finalTime: Date;
  workshopId: number;
  workshop?: WorkshopDTO;

  constructor(id: number, startTime: Date, finalTime: Date, workshopId: number, workshop?: WorkshopDTO) {
    this.id = id;
    this.startTime = startTime;
    this.finalTime = finalTime;
    this.workshopId = workshopId;
    if (workshop) this.workshop = workshop;
  }
}
