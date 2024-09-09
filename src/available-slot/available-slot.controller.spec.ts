/*
import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSlotController } from './available-slot.controller';
import { AvailableSlotService } from './available-slot.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';
import { HttpStatus } from '@nestjs/common';

describe('AvailableSlotController', () => {
  let controller: AvailableSlotController;
  let service: AvailableSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableSlotController],
      providers: [
        AvailableSlotService,
        {
          provide: AvailableSlotService,
          useValue: {
            list: jest.fn().mockResolvedValue([]),
            getByWorkshop: jest.fn().mockResolvedValue([]),
            createAvailableSlot: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<AvailableSlotController>(AvailableSlotController);
    service = module.get<AvailableSlotService>(AvailableSlotService);
  });

  describe('list', () => {
    it('should return a successful response with the list of available slots', async () => {
      const expectedResponse = new ResponseDTO(
        HttpStatus.OK,
        'Available slots have been listed',
        'Horários disponíveis listados com sucesso',
        [],
      );
      expect(await controller.list()).toEqual(expectedResponse);
      expect(service.list).toHaveBeenCalled();
    });
  });

  describe('getByWorkshopId', () => {
    it('should return a successful response with the list of available slots for the specified workshop ID', async () => {
      const workshopId = 1;
      const expectedResponse = new ResponseDTO(
        HttpStatus.OK,
        'Available slots have been listed',
        'Horários disponíveis listados com sucesso',
        [],
      );
      expect(await controller.getByWorkshopId(workshopId)).toEqual(expectedResponse);
      expect(service.getByWorkshop).toHaveBeenCalledWith(workshopId);
    });
  });

  describe('createAvailableSlot', () => {
    it('should return a successful response with the created available slot', async () => {
      const createAvailableSlotDTO: CreateAvailableSlotDTO = {
        // provide the required fields for CreateAvailableSlotDTO
      };
      const expectedResponse = new ResponseDTO(
        HttpStatus.OK,
        'Available slot has been created',
        'Horário disponível criado com sucesso',
        true,
      );
      expect(await controller.createAvailableSlot(createAvailableSlotDTO)).toEqual(expectedResponse);
      expect(service.createAvailableSlot).toHaveBeenCalledWith(createAvailableSlotDTO);
    });

    it('should return a bad request response if the creation fails', async () => {
      const createAvailableSlotDTO: CreateAvailableSlotDTO = {
        // provide the required fields for CreateAvailableSlotDTO
      };
      jest.spyOn(service, 'createAvailableSlot').mockResolvedValue(null);
      const expectedResponse = new ResponseDTO(
        HttpStatus.BAD_REQUEST,
        'Failed to create available slot',
        'Falha ao criar horário disponível',
      );
      expect(await controller.createAvailableSlot(createAvailableSlotDTO)).toEqual(expectedResponse);
      expect(service.createAvailableSlot).toHaveBeenCalledWith(createAvailableSlotDTO);
    });
  });
});
*/