import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AvailableSlotService } from './available-slot.service';
import { AvailableSlotEntity } from './available-slot.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AvailableSlotDTO } from './dtos/available-slot.dto';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';
import { AvailableSlotDay } from './interfaces/available-slot-day.interface';
import { WorkshopDTO } from '../workshop/dtos/workshop.dto';
import { AddressDTO } from '../address/dtos/address.dto';

const mockAddress = new AddressDTO(1, '123 Main St', 'Street', 'City', 'State', '00000');

const workshopDTO = new WorkshopDTO(1, 'Workshop 1', 'Description 1', mockAddress, null);

const availableSlotEntityArray: AvailableSlotEntity[] = [
  {
    id: 1,
    startTime: '08:00',
    finalTime: '12:00',
    workshopId: 1,
    day: 'mon' as AvailableSlotDay,
    workshop: workshopDTO as any,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    startTime: '13:00',
    finalTime: '17:00',
    workshopId: 1,
    day: 'tue' as AvailableSlotDay,
    workshop: workshopDTO as any,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('AvailableSlotService', () => {
  let service: AvailableSlotService;
  let repository: Repository<AvailableSlotEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailableSlotService,
        {
          provide: getRepositoryToken(AvailableSlotEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AvailableSlotService>(AvailableSlotService);
    repository = module.get<Repository<AvailableSlotEntity>>(getRepositoryToken(AvailableSlotEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return a list of AvailableSlotDTOs', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(availableSlotEntityArray);

      const result = await service.list();
      expect(result).toEqual(availableSlotEntityArray.map((as) => new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.day, workshopDTO)));
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByWorkshop', () => {
    it('should return available slots by workshop ID', async () => {
      const workshopId = 1;
      jest.spyOn(repository, 'find').mockResolvedValue(availableSlotEntityArray);

      const result = await service.getByWorkshop(workshopId);
      expect(result).toEqual(availableSlotEntityArray.map((as) => new AvailableSlotDTO(as.id, as.startTime, as.finalTime, as.workshopId, as.day)));
      expect(repository.find).toHaveBeenCalledWith({ where: { workshopId } });
    });
  });

  describe('createAvailableSlot', () => {
    it('should create new available slots and return them', async () => {
      const createAvailableSlotDTO: CreateAvailableSlotDTO = {
        startTime: '08:00',
        finalTime: '12:00',
        workshopId: 1,
        recurrence: ['mon', 'tue'],
      };

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      jest.spyOn(repository, 'create').mockImplementation(
        (availableSlotEntity: Partial<AvailableSlotEntity>) =>
          ({
            ...availableSlotEntity,
            id: Math.floor(Math.random() * 100),
            workshop: { id: availableSlotEntity.workshopId },
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          }) as AvailableSlotEntity,
      );

      jest.spyOn(repository, 'save').mockImplementation((availableSlotEntity: AvailableSlotEntity) =>
        Promise.resolve({
          ...availableSlotEntity,
          id: Math.floor(Math.random() * 100),
          startTime: availableSlotEntity.startTime,
          finalTime: availableSlotEntity.finalTime,
          workshopId: availableSlotEntity.workshopId,
          day: availableSlotEntity.day,
          workshop: availableSlotEntity.workshop,
          deletedAt: availableSlotEntity.deletedAt ?? null,
          createdAt: availableSlotEntity.createdAt ?? new Date(),
          updatedAt: new Date(),
        }),
      );

      const result = await service.createAvailableSlot(createAvailableSlotDTO);

      expect(result).toHaveLength(createAvailableSlotDTO.recurrence.length);
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(createAvailableSlotDTO.recurrence.length);
      expect(repository.save).toHaveBeenCalledTimes(createAvailableSlotDTO.recurrence.length);
    });

    it('should return null if more than 1 available slot exists for the workshop', async () => {
      const createAvailableSlotDTO: CreateAvailableSlotDTO = {
        startTime: '08:00',
        finalTime: '12:00',
        workshopId: 1,
        recurrence: ['mon', 'tue'],
      };

      jest.spyOn(repository, 'find').mockResolvedValue([availableSlotEntityArray[0], availableSlotEntityArray[1]]);

      const result = await service.createAvailableSlot(createAvailableSlotDTO);
      expect(result).toBeNull();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });
});
