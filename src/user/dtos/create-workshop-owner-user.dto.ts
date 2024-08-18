import { CreateUserDTO } from './create-user.dto';

export class CreateWorkshopOwnerUserDTO extends CreateUserDTO {
  workshop_name: string;
  workshop_description: string;
  address_name: string;
  street: string;
  city: string;
  zip_code: string;
  state: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    cpf: string,
    password: string,
    workshop_name: string,
    workshop_description: string,
    address_name: string,
    street: string,
    city: string,
    zip_code: string,
    state: string,
  ) {
    super(name, email, phone, cpf, password);
    this.workshop_name = workshop_name;
    this.workshop_description = workshop_description;
    this.address_name = address_name;
    this.street = street;
    this.city = city;
    this.zip_code = zip_code;
    this.state = state;
  }
}
