import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  cpf?: string;

  constructor(id: number, updateData: Partial<CreateUserDTO>) {
    this.id = id;
    if (updateData.name) this.name = updateData.name;
    if (updateData.email) this.email = updateData.email;
    if (updateData.phone) this.phone = updateData.phone;
    if (updateData.cpf) this.cpf = updateData.cpf;
  }
}
