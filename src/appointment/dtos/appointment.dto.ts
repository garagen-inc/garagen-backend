export class AppointmentDTO {
  id: number;
  start_time: string;
  final_time: string;
  user_id: number;
  workshop_id: number;
  appointment_date: string;

  constructor(id: number, startTime: string, finalTime: string, userId: number, workshopId: number, appointment_date: string) {
    this.id = id;
    this.start_time = startTime;
    this.final_time = finalTime;
    this.user_id = userId;
    this.workshop_id = workshopId;
    this.appointment_date = appointment_date;
  }
}
