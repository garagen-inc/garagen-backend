import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { HttpStatus } from '@nestjs/common';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { LoginDTO } from './dto/login.dto';

const user = new UserDTO(1, 'name', 'email', 'phone', 'cpf', true, null, null);
const loginResponse = new LoginResponseDTO('access_token', user);

const loginResponseDTO = new ResponseDTO(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso',); 

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: {
          login: jest.fn().mockReturnValue(user),
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
    it('should return 401 Unauthorized when login fails', async () => {
      const loginDto = new LoginDTO();
      jest.spyOn(authService, 'login').mockImplementationOnce(() => {
        return null; // simula a falha no login
      });
      const response = await authController.login(loginDto);
      expect(response).toBeInstanceOf(ResponseDTO);
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.message).toBe('Email ou senha incorretos');
    });
  })
});
