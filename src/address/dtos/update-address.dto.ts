export class UpdateAddressDTO {
  addressId: number;
  name: string;
  street: string;
  city: string;
  zip_code: string;
  state: string;

  constructor(addressId: number, name: string, street: string, city: string, zip_code: string, state: string) {
    this.addressId = addressId;
    this.name = name;
    this.street = street;
    this.city = city;
    this.zip_code = zip_code;
    this.state = state;
  }
}
