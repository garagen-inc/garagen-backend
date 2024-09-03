import { AvailableSlotDay } from 'src/available-slot/interfaces/available-slot-day.interface';

export class CreateAppointmentDTO {
  start_time: string;
  final_time: string;
  user_id: number;
  day: AvailableSlotDay;
  workshop_id: number;
  appointment_date: string;

  constructor(start_time: string, final_time: string, user_id: number, day: AvailableSlotDay, workshop_id: number, appointment_date: string) {
    this.start_time = start_time;
    this.final_time = final_time;
    this.user_id = user_id;
    this.day = day;
    this.workshop_id = workshop_id;
    this.appointment_date = appointment_date;
  }
}
