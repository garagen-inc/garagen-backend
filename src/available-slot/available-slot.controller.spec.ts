import { Test, TestingModule } from '@nestjs/testing';
import { AvailableSlotController } from './available-slot.controller';
import { AvailableSlotService } from './available-slot.service';
import { CreateAvailableSlotDTO } from './dtos/create-available-slot.dto';
import { AvailableSlotDTO } from './dtos/available-slot.dto';
import { AvailableSlotDay } from './interfaces/available-slot-day.interface';

const availDay: AvailableSlotDay = 'mon'
const availDays: AvailableSlotDay[] = ['mon', 'tue', 'wed', 'thu', 'fri']
const createAvailableSlotDTO = new CreateAvailableSlotDTO('10:00', '11:00', 1, availDays);
const availableSlotDTO = new AvailableSlotDTO(1, '10:00', '11:00', 1, availDay);

describe('AvailableSlotController', () => {
    let ascontroller: AvailableSlotController;
    let asservice: AvailableSlotService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AvailableSlotController],
            providers: [{
                provide: AvailableSlotService,
                useValue: {
                    list : jest.fn().mockReturnValue([]),
                    getByWorkshopId : jest.fn().mockReturnValue([]),
                    createAvailableSlot : jest.fn().mockReturnValue([]),
                },
            }],
        }).compile();

        ascontroller = module.get<AvailableSlotController>(AvailableSlotController);
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
        expect(await ascontroller.createAvailableSlot({
            workshopId: 1,
            startTime: '10:00',
            finalTime: '11:00',
            day: 'Monday'
        })).toEqual([]);
    })
})