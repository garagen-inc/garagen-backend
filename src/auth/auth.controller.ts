import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createApiResponse } from 'src/utils/api-response.util';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const logged = await this.authService.login(body);

    if (!logged) {
      createApiResponse(
        401,
        'User or password is incorrect',
        'Usuário ou senha incorretos',
      );
    }

    createApiResponse(
      HttpStatus.OK,
      'Authenticated with success',
      'Autenticado com sucesso',
    );
  }
}
