import { AvailableSlotDay } from '../interfaces/available-slot-day.interface';

export class CreateAvailableSlotDTO {
  startTime: string;
  finalTime: string;
  workshopId: number;
  recurrence: AvailableSlotDay[];

  constructor(startTime: string, finalTime: string, workshopId: number, recurrence: AvailableSlotDay[]) {
    this.startTime = startTime;
    this.finalTime = finalTime;
    this.workshopId = workshopId;
    this.recurrence = recurrence;
  }
}
