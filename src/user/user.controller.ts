import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDTO } from 'src/utils/api-response.util';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return new ResponseDTO(200, 'Users has been listed', 'Usuários listados com sucesso', await this.userService.list());
  }

  @Post('create')
  async createUser(@Body() body: { name: string; password: string }) {
    const { name, password } = body;
    const user = await this.userService.create(name, password);
    if (!user) {
      return new ResponseDTO(500, 'Failed to create user', 'Falha ao criar usuário');
    }
    return new ResponseDTO(201, 'User has been created', 'Usuário criado com sucesso', user);
  }
}
