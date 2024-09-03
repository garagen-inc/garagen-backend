import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AvailableSlotEntity } from '../available-slot/available-slot.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateAppointmentDTO } from './dtos/create-appointment.dto';
import { UserEntity } from 'src/user/user.entity';
import { WorkshopEntity } from 'src/workshop/workshop.entity';
import { AppointmentDTO } from './dtos/appointment.dto';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let appointmentRepository: Repository<AppointmentEntity>;
  let availableSlotRepository: Repository<AvailableSlotEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(AppointmentEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AvailableSlotEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WorkshopEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    appointmentRepository = module.get<Repository<AppointmentEntity>>(getRepositoryToken(AppointmentEntity));
    availableSlotRepository = module.get<Repository<AvailableSlotEntity>>(getRepositoryToken(AvailableSlotEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAppointment', () => {
    it('should throw an error if available slot is not found', async () => {
      jest.spyOn(availableSlotRepository, 'findOne').mockResolvedValue(null);

      const createAppointmentDTO: CreateAppointmentDTO = {
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        day: 'mon',
        workshop_id: 1,
        appointment_date: '10/10/2010',
      };

      await expect(service.createAppointment(createAppointmentDTO)).rejects.toThrow(new BadRequestException('Available slot not found for the specified day'));
    });

    it('should throw an error if appointment time is outside the available slot range', async () => {
      jest.spyOn(availableSlotRepository, 'findOne').mockResolvedValue({
        id: 1,
        workshopId: 1,
        day: 'mon',
        startTime: '08:00',
        finalTime: '12:00',
      } as any);

      const createAppointmentDTO: CreateAppointmentDTO = {
        start_time: '07:00',
        final_time: '08:30',
        user_id: 1,
        day: 'mon',
        workshop_id: 1,
        appointment_date: '10/10/2010',
      };

      await expect(service.createAppointment(createAppointmentDTO)).rejects.toThrow(new BadRequestException('Appointment time is outside the available slot range'));
    });

    it('should throw an error if the available slot is already occupied', async () => {
      jest.spyOn(availableSlotRepository, 'findOne').mockResolvedValue({
        id: 1,
        workshopId: 1,
        day: 'mon',
        startTime: '08:00',
        finalTime: '12:00',
        appointment_date: '10/10/2010',
      } as any);

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValue({
        id: 1,
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        workshop_id: 1,
        appointment_date: '10/10/2010',
      } as any);

      const createAppointmentDTO: CreateAppointmentDTO = {
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        day: 'mon',
        workshop_id: 1,
        appointment_date: '10/10/2010',
      };

      await expect(service.createAppointment(createAppointmentDTO)).rejects.toThrow(new BadRequestException('The available slot is already occupied'));
    });

    it('should create an appointment successfully', async () => {
      jest.spyOn(availableSlotRepository, 'findOne').mockResolvedValue({
        id: 1,
        workshopId: 1,
        day: 'mon',
        startTime: '08:00',
        finalTime: '12:00',
        appointment_date: '10/10/2010',
      } as any);

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(appointmentRepository, 'save').mockResolvedValue({
        id: 1,
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        workshop_id: 1,
        appointment_date: '10/10/2010',
      } as any);

      const createAppointmentDTO: CreateAppointmentDTO = {
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        day: 'mon',
        workshop_id: 1,
        appointment_date: '10/10/2010',
      };

      const result = await service.createAppointment(createAppointmentDTO);

      expect(result).toEqual({
        id: 1,
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        workshop_id: 1,
        appointment_date: '10/10/2010',
      });
    });
  });

  describe('listAppointments', () => {
    it('should return a list of appointments', async () => {
      const mockAppointments = [
        { id: 1, start_time: '09:00', final_time: '10:00', user_id: 1, workshop_id: 1, appointment_date: '10/10/2024' },
        { id: 2, start_time: '10:00', final_time: '11:00', user_id: 2, workshop_id: 1, appointment_date: '11/10/2024' },
      ];

      jest.spyOn(appointmentRepository, 'find').mockResolvedValue(mockAppointments as any);

      const expectedAppointments = mockAppointments.map(
        (appointment) => new AppointmentDTO(appointment.id, appointment.start_time, appointment.final_time, appointment.user_id, appointment.workshop_id, appointment.appointment_date),
      );
      const appointments = await service.list(1);
      expect(appointments).toEqual(expectedAppointments);
    });

    it('should handle empty result', async () => {
      jest.spyOn(appointmentRepository, 'find').mockResolvedValue([]);

      const appointments = await service.list(1);
      expect(appointments).toEqual([]);
    });

    it('should handle errors from the repository', async () => {
      jest.spyOn(appointmentRepository, 'find').mockRejectedValue(new Error('Database error'));
      await expect(service.list(1)).rejects.toThrow('Database error');
    });
  });
});