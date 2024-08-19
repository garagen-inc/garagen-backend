import { AddressDTO } from 'src/address/dtos/address.dto';

export class WorkshopDTO {
  id: number;
  name: string;
  description: string;
  address: AddressDTO;
  workshopImage: string | null;

  constructor(id: number, name: string, description: string, address: AddressDTO, workshopImage: string | null = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.workshopImage = workshopImage;
  }
}
