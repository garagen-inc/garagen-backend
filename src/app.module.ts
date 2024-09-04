import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { WorkshopEntity } from './workshop/workshop.entity';
import { AvailableSlotEntity } from './available-slot/available-slot.entity';
import { AppointmentEntity } from './appointment/appointment.entity';
import { AddressEntity } from './address/address.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { WorkshopModule } from './workshop/workshop.module';
import { AppController } from './app.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { AvailableSlotModule } from './available-slot/available-slot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, WorkshopEntity, AvailableSlotEntity, AppointmentEntity, AddressEntity]),
    AuthModule,
    UserModule,
    WorkshopModule,
    AppointmentModule,
    AvailableSlotModule,
  ],
  providers: [JwtService, UserService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AppController],
})
export class AppModule {}
