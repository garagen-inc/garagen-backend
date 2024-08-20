import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';
import { AvailableSlotDay } from '../interfaces/available-slot-day.interface';

export class AvailableSlotDTO {
  id: number;
  startTime: string;
  finalTime: string;
  workshopId: number;
  day: AvailableSlotDay;
  workshop?: WorkshopDTO;

  constructor(id: number, startTime: string, finalTime: string, workshopId: number, day: AvailableSlotDay, workshop?: WorkshopDTO) {
    this.id = id;
    this.startTime = startTime;
    this.finalTime = finalTime;
    this.workshopId = workshopId;
    this.day = day;
    if (workshop) this.workshop = workshop;
  }
}
