import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(@Inject("ADDRESS_REPOSITORY") private addressRepository: Repository<Address>){}
  
  create(createAddressDto: CreateAddressDto) {
    let newAddress: Address = new Address();
    newAddress.cep = createAddressDto.cep;
    newAddress.municipality = createAddressDto.municipality;
    newAddress.state = createAddressDto.state;
    newAddress.userId = createAddressDto.userId;
    newAddress.houseNumber = createAddressDto.houseNumber;
    return this.addressRepository.save(createAddressDto);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
