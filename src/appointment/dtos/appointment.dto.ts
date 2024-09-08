export class AppointmentDTO {
  id: number;
  start_time: string;
  final_time: string;
  user_id: number;
  user_name: string;
  workshop_id: number;
  appointment_date: string;

  constructor(id: number, startTime: string, finalTime: string, userId: number, user_name: string, workshopId: number, appointment_date: string) {
    this.id = id;
    this.start_time = startTime;
    this.final_time = finalTime;
    this.user_id = userId;
    this.user_name = user_name;
    this.workshop_id = workshopId;
    this.appointment_date = appointment_date;
  }
}
