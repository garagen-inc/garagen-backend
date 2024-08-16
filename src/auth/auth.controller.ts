import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const loginResponseDTO = await this.authService.login(body);

    if (!loginResponseDTO) {
      return new ResponseDTO(HttpStatus.UNAUTHORIZED, 'Email or password is incorrect', 'Email ou senha incorretos');
    }

    return new ResponseDTO(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso', loginResponseDTO);
  }
}
