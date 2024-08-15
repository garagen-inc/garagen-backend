import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const logged = await this.authService.login(body);

    if (!logged) {
      return new ResponseDTO(HttpStatus.UNAUTHORIZED, 'User or password is incorrect', 'Usuário ou senha incorretos');
    }

    return new ResponseDTO(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso');
  }
}
