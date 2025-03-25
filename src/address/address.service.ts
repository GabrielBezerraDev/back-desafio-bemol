import { HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(@Inject("ADDRESS_REPOSITORY") private addressRepository: Repository<Address>){}
  
  @HttpCode(HttpStatus.CREATED)
  create(createAddressDto: CreateAddressDto) {
    let newAddress: Address = new Address();
    newAddress.cep = createAddressDto.cep;
    newAddress.municipality = createAddressDto.municipality;
    newAddress.state = createAddressDto.state;
    newAddress.userId = createAddressDto.userId;
    newAddress.houseNumber = createAddressDto.houseNumber;
    return this.addressRepository.save(createAddressDto);
  }

}
