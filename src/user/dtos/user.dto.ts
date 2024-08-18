import { AppointmentEntity } from 'src/appointment/appointment.entity';
import { WorkshopDTO } from 'src/workshop/dtos/workshop.dto';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  isWorkshopOwner: boolean;
  workshop_id: number | null;
  workshop?: WorkshopDTO;
  appointments?: AppointmentEntity[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, email: string, phone: string, cpf: string, isWorkshopOwner: boolean, workshop_id?: number | null, workshop?: WorkshopDTO, appointments?: AppointmentEntity[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.isWorkshopOwner = isWorkshopOwner;
    if (workshop_id) this.workshop_id = workshop_id;
    if (workshop) this.workshop = workshop;
    if (appointments) this.appointments = appointments;
  }
}
