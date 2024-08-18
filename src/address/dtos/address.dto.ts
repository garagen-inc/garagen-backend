import { AddressEntity } from '../address.entity';

export class AddressDTO {
  id: number;
  name: string;
  street: string;
  city: string;
  zip_code: string;
  state: string;

  constructor(id: number, name: string, street: string, city: string, zip_code: string, state: string) {
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.zip_code = zip_code;
    this.state = state;
  }
  static constructorBasedOnEntity(addressEntity: AddressEntity): AddressDTO {
    return new AddressDTO(addressEntity.id, addressEntity.name, addressEntity.street, addressEntity.city, addressEntity.zip_code, addressEntity.state);
  }
}
