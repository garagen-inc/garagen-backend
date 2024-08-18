import { Controller, Post, Body, Get, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { CreateUserDTO } from './dtos/create-user.dto';
import { JWT } from 'src/decorators/jwt.decorator';
import { CreateWorkshopOwnerUserDTO } from './dtos/create-workshop-owner-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return new ResponseDTO(HttpStatus.OK, 'Users has been listed', 'Usuários listados com sucesso', await this.userService.list());
  }

  @JWT(false)
  @Post('create')
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body);
    if (!user) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to create user', 'Falha ao criar usuário');
    }
    return new ResponseDTO(HttpStatus.CREATED, 'User has been created', 'Usuário criado com sucesso', user);
  }

  @JWT(false)
  @Post('create-workshop-owner')
  async createWorkshopOwnerUser(@Body() body: CreateWorkshopOwnerUserDTO) {
    const user = await this.userService.createWorkshopOwnerUser(body);
    if (!user) {
      return new ResponseDTO(HttpStatus.BAD_REQUEST, 'Failed to create user', 'Falha ao criar usuário');
    }
    return new ResponseDTO(HttpStatus.CREATED, 'User has been created', 'Usuário criado com sucesso', user);
  }
}
