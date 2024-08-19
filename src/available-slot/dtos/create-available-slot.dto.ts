export type AvailableSlotDays = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export class CreateAvailableSlotDTO {
  startTime: Date;
  finalTime: Date;
  workshopId: number;
  // recurrence: AvailableSlotDays[];

  constructor(startTime: Date, finalTime: Date, workshopId: number) {
    this.startTime = startTime;
    this.finalTime = finalTime;
    this.workshopId = workshopId;
  }
}
