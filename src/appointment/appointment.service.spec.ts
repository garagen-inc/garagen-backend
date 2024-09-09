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

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  cpf: '123.456.789-00',
  password: 'hashedPassword123',
  isWorkshopOwner: false,
  workshop_id: null,
};

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
            delete: jest.fn(),
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

    it('should successfully create an appointment', async () => {
      const createAppointmentDTO: CreateAppointmentDTO = {
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        workshop_id: 1,
        day: 'mon',
        appointment_date: '2024-09-10',
      };

      const mockAvailableSlot: AvailableSlotEntity = {
        id: 1,
        startTime: '08:00',
        finalTime: '12:00',
        workshopId: 1,
        day: 'mon',
        workshop: {} as any,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockAppointmentEntity: AppointmentEntity = {
        id: 1,
        start_time: '09:00',
        final_time: '10:00',
        user_id: 1,
        workshop_id: 1,
        appointment_date: '2024-09-10',
        user: { id: 1, name: 'John Doe' } as UserEntity,
        workshop: {} as any,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(availableSlotRepository, 'findOne').mockResolvedValue(mockAvailableSlot);

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(null).mockResolvedValueOnce(mockAppointmentEntity);

      jest.spyOn(appointmentRepository, 'create').mockReturnValue(mockAppointmentEntity);
      jest.spyOn(appointmentRepository, 'save').mockResolvedValue(mockAppointmentEntity);

      const result = await service.createAppointment(createAppointmentDTO);

      expect(result).toEqual(
        new AppointmentDTO(
          mockAppointmentEntity.id,
          mockAppointmentEntity.start_time,
          mockAppointmentEntity.final_time,
          mockAppointmentEntity.user_id,
          mockAppointmentEntity.user.name,
          mockAppointmentEntity.workshop_id,
          mockAppointmentEntity.appointment_date,
        ),
      );

      expect(availableSlotRepository.findOne).toHaveBeenCalledWith({
        where: { workshopId: createAppointmentDTO.workshop_id, day: createAppointmentDTO.day },
      });

      expect(appointmentRepository.create).toHaveBeenCalledWith({
        start_time: createAppointmentDTO.start_time,
        final_time: createAppointmentDTO.final_time,
        user_id: createAppointmentDTO.user_id,
        workshop_id: createAppointmentDTO.workshop_id,
        appointment_date: createAppointmentDTO.appointment_date,
      });

      expect(appointmentRepository.save).toHaveBeenCalledWith(mockAppointmentEntity);
      expect(appointmentRepository.findOne).toHaveBeenCalledWith({ where: { id: mockAppointmentEntity.id }, relations: ['user'] });
    });
  });

  describe('listAppointments', () => {
    it('should return a list of appointments', async () => {
      const mockAppointments = [
        { id: 1, start_time: '09:00', final_time: '10:00', user_id: 1, workshop_id: 1, appointment_date: '10/10/2024', user: mockUser },
        { id: 2, start_time: '10:00', final_time: '11:00', user_id: 2, workshop_id: 1, appointment_date: '11/10/2024', user: mockUser },
      ];

      jest.spyOn(appointmentRepository, 'find').mockResolvedValue(mockAppointments as any);

      const expectedAppointments = mockAppointments.map(
        (appointment) =>
          new AppointmentDTO(appointment.id, appointment.start_time, appointment.final_time, appointment.user_id, appointment.user.name, appointment.workshop_id, appointment.appointment_date),
      );
      const appointments = await service.list(1);
      expect(appointments).toEqual(expectedAppointments);
    });

    it('should handle empty result', async () => {
      jest.spyOn(appointmentRepository, 'find').mockResolvedValue([]);

      const appointments = await service.list(1);
      expect(appointments).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a appointment', async () => {
      const mockAppointment = { id: 1, start_time: '09:00', final_time: '10:00', user_id: 1, workshop_id: 1, appointment_date: '10/10/2024', user: mockUser };

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValue(mockAppointment as any);

      const expectedAppointment = new AppointmentDTO(
        mockAppointment.id,
        mockAppointment.start_time,
        mockAppointment.final_time,
        mockAppointment.user_id,
        mockAppointment.user.name,
        mockAppointment.workshop_id,
        mockAppointment.appointment_date,
      );
      const appointment = await service.findOne(1);
      expect(appointment).toEqual(expectedAppointment);
    });

    it('should handle undefined result', async () => {
      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValue(undefined);

      const appointment = await service.findOne(3);
      expect(appointment).toEqual(undefined);
    });
  });

  describe('delete', () => {
    it('should handle delete', async () => {
      const mockAppointments = [
        { id: 1, start_time: '09:00', final_time: '10:00', user_id: 1, workshop_id: 1, appointment_date: '10/10/2024', user: mockUser },
        { id: 2, start_time: '10:00', final_time: '11:00', user_id: 2, workshop_id: 1, appointment_date: '11/10/2024', user: mockUser },
      ];

      const mockAppointmentsAfterDelete = [{ id: 2, start_time: '10:00', final_time: '11:00', user_id: 2, workshop_id: 1, appointment_date: '11/10/2024', user: mockUser }];

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(mockAppointments[0] as any);
      jest.spyOn(appointmentRepository, 'delete').mockResolvedValueOnce(undefined);
      jest.spyOn(appointmentRepository, 'find').mockResolvedValueOnce(mockAppointmentsAfterDelete as any);

      await service.delete(1);

      const appointments = await service.list(1);
      expect(appointments).toHaveLength(mockAppointmentsAfterDelete.length);
    });

    it('should handle concurrent deletions', async () => {
      const mockAppointments = [
        { id: 1, start_time: '09:00', final_time: '10:00', user_id: 1, workshop_id: 1, appointment_date: '10/10/2024' },
        { id: 2, start_time: '10:00', final_time: '11:00', user_id: 2, workshop_id: 1, appointment_date: '11/10/2024' },
      ];

      jest.spyOn(appointmentRepository, 'findOne').mockResolvedValueOnce(mockAppointments[0] as any);
      jest.spyOn(appointmentRepository, 'delete').mockResolvedValueOnce(undefined);

      const deletePromises = [service.delete(1), service.delete(1)];
      const results = await Promise.all(deletePromises);

      expect(results).toEqual([true, false]);
    });

    it('should handle invalid appointmentId input', async () => {
      const result = await service.delete(null as any);
      expect(result).toBe(false);
    });
  });
});
