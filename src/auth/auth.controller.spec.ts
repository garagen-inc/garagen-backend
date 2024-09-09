import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { HttpStatus } from '@nestjs/common';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/user/dtos/user.dto';

const user = new UserDTO(1, 'name', 'email', 'phone', 'cpf', true, null, null);
const loginResponse = new LoginResponseDTO('access_token', user);

const loginResponseDTO = new ResponseDTO(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso', Date.now());

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          login: jest.fn().mockReturnValue(loginResponseDTO),
        }
      }],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });
  describe('login', () => {
    it('should return login', async () => {
      const login = await authController.login(user);
      expect(login).toEqual(loginResponseDTO);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });

    it('should throw error', async () => {
      jest.spyOn(authService, 'login').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(authController.login({ email: 'email', password: 'password' })).rejects.toThrow();
    });
  })
});
