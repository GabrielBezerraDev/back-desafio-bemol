import { addressHistoryProviders } from './address.provider';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService,...addressHistoryProviders],
})
export class AddressModule {}
