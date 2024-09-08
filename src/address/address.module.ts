import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { AddressController } from './address.controler';
import { WorkshopEntity } from 'src/workshop/workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity, WorkshopEntity])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
