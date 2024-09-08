import { Body, Controller, Get, HttpStatus, Param, Patch } from '@nestjs/common';
import { AddressService } from './address.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { JWT } from 'src/decorators/jwt.decorator';
import { UpdateAddressDTO } from './dtos/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/:addressId')
  @JWT(false)
  async getAddress(@Param('addressId') addressId: number) {
    const address = await this.addressService.getAddressById(addressId);
    if (!address) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, 'Address not found', 'Endereço não encontrado');
    }
    return new ResponseDTO(HttpStatus.OK, 'Address fetched successfully', 'Endereço encontrado com sucesso', address);
  }

  @Patch()
  async updateAddress(@Body() updateAddressDto: UpdateAddressDTO) {
    const address = await this.addressService.updateAddress(updateAddressDto);
    if (!address) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, 'Failed to update address', 'Falha ao atualizar endereço');
    }
    return new ResponseDTO(HttpStatus.OK, 'Address updated successfully', 'Endereço atualizado com sucesso', address);
  }
}
