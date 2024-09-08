import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { UpdateAddressDTO } from './dtos/update-address.dto';
import { AddressDTO } from './dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  async getAddressById(addressId: number): Promise<AddressDTO | null> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
    });

    if (!address) {
      return null;
    }

    return new AddressDTO(address.id, address.name, address.street, address.city, address.zip_code, address.state);
  }

  async updateAddress(updateAddressDto: UpdateAddressDTO): Promise<AddressDTO | null> {
    const address = await this.addressRepository.findOne({
      where: { id: updateAddressDto.addressId },
    });

    if (!address) {
      return null;
    }

    address.name = updateAddressDto.name;
    address.street = updateAddressDto.street;
    address.city = updateAddressDto.city;
    address.zip_code = updateAddressDto.zip_code;
    address.state = updateAddressDto.state;

    await this.addressRepository.save(address);

    return new AddressDTO(address.id, address.name, address.street, address.city, address.zip_code, address.state);
  }
}
