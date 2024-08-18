export class CreateAddressDTO {
  name: string;
  street: string;
  city: string;
  zip_code: string;
  state: string;

  constructor(name: string, street: string, city: string, zip_code: string, state: string) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.zip_code = zip_code;
    this.state = state;
  }
}
