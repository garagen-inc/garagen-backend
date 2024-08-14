import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { throwApiResponse } from 'src/utils/api-response.util';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const logged = await this.authService.login(body);

    if (!logged) {
      throwApiResponse(401, 'User or password is incorrect', 'Usuário ou senha incorretos');
    }

    throwApiResponse(HttpStatus.OK, 'Authenticated with success', 'Autenticado com sucesso');
  }
}
