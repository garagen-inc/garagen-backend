import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSlotController } from './available-slot.controller';
import { AvailableSlotService } from './available-slot.service';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';
import { AvailableSlotDTO } from './dtos/available-slot.dto';
import { AvailableSlotDay } from './interfaces/available-slot-day.interface';
import { ResponseDTO } from 'src/utils/api-response.util';
import { HttpStatus } from '@nestjs/common';

const availDay: AvailableSlotDay = 'mon'
const availDays: AvailableSlotDay[] = ['mon', 'tue', 'wed', 'thu', 'fri']
const createAvailableSlotDTO = new CreateAvailableSlotDTO('10:00', '11:00', 1, availDays);
const availableSlotDTO = new AvailableSlotDTO(1, '10:00', '11:00', 1, availDay);

const loginResponseDTO = new ResponseDTO(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso', Date.now());


describe('AvailableSlotController', () => {
    let ascontroller: AvailableSlotController;
    let asservice: AvailableSlotService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AvailableSlotController],
            providers: [{
                provide: AvailableSlotService,
                useValue: {
                    list : jest.fn().mockReturnValue(loginResponseDTO),
                    getByWorkshopId : jest.fn().mockReturnValue(loginResponseDTO),
                    createAvailableSlot : jest.fn().mockReturnValue(loginResponseDTO),
                },
            }],
        }).compile();

        ascontroller = module.get<AvailableSlotController>(AvailableSlotController);
        asservice = module.get<AvailableSlotService>(AvailableSlotService);
    }); 

    it('should be defined', () => {
        expect(ascontroller).toBeDefined();
        expect(asservice).toBeDefined();
    });

    it('should list available slots', async () => {
        expect(await ascontroller.list()).toEqual([]);
    })

    it('should list available slots by workshop id', async () => {
        expect(await ascontroller.getByWorkshopId(1)).toEqual([]);
    })

    it('should create available slot', async () => {
        expect(await ascontroller.createAvailableSlot(createAvailableSlotDTO)).toEqual(loginResponseDTO);
    })
})