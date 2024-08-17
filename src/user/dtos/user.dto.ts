import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  workshop_id: string | null;
  workshop?: WorkshopEntity;
  appointments?: AppointmentEntity[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, email: string, phone: string, cpf: string, workshop_id: string | null, workshop?: WorkshopEntity, appointments?: AppointmentEntity[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    if (workshop_id) this.workshop_id = workshop_id;
    if (workshop) this.workshop = workshop;
    if (appointments) this.appointments = appointments;
  }
}
