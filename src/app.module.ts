import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { WorkshopEntity } from './workshop/workshop.entity';
import { AvailableSlotEntity } from './available-slot/available-slot.entity';
import { AppointmentEntity } from './appointment/appointment.entity';
import { AddressEntity } from './address/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity]),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
