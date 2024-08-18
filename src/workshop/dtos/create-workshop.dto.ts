import { AddressEntity } from 'src/address/address.entity';

export class CreateWorkshopDTO {
  name: string;
  description: string;
  address: AddressEntity;

  constructor(name: string, description: string, address: AddressEntity) {
    this.name = name;
    this.description = description;
    this.address = address;
  }
}
