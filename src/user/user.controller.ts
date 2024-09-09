import { Controller, Post, Body, Get, HttpStatus, Patch, Delete, Req, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDTO } from 'src/utils/api-response.util';
import { CreateUserDTO } from './dtos/create-user.dto';
import { JWT } from 'src/decorators/jwt.decorator';
import { CreateWorkshopOwnerUserDTO } from './dtos/create-workshop-owner-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { RequestHeaderType } from 'src/utils/types/types';
import { ChangePasswordUserDTO } from './dtos/change-password-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return new ResponseDTO(HttpStatus.OK, 'Users has been listed', 'Usuários listados com sucesso', await this.userService.list());
  }

  @Delete()
  async delete(@Req() request: RequestHeaderType) {
    const userHasBeenDeleted = await this.userService.delete(request.payloadDTO.id);
    if (userHasBeenDeleted) {
      return new ResponseDTO(HttpStatus.OK, 'User has been deleted', 'Usuário deletado com sucesso');
    }
    return new ResponseDTO(HttpStatus.NOT_FOUND, 'Failed to delete user', 'Falha ao deletar usuário');
  }

  @Patch()
  async update(@Req() request: RequestHeaderType, @Body() body: UpdateUserDTO) {
    if (String(request.payloadDTO.id) !== String(body.id)) return new ResponseDTO(HttpStatus.UNAUTHORIZED, 'User cant be updated, not your user.', 'Não foi possível atualizar o usuário');

    const user = await this.userService.update(body);
    if (!user) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, 'Failed to update user', 'Falha ao editar usuário');
    }
    return new ResponseDTO(HttpStatus.OK, 'User updated successfully', 'Usuário atualizado com sucesso', user);
  }

  @Patch('change-password')
  async changePassword(@Req() request: RequestHeaderType, @Body() body: ChangePasswordUserDTO) {
    if (String(request.payloadDTO.id) !== String(body.id)) return new ResponseDTO(HttpStatus.UNAUTHORIZED, 'User cant be updated, not your user.', 'Não foi possível atualizar o usuário');

    const user = await this.userService.changePassword(body);
    if (!user) {
      return new ResponseDTO(HttpStatus.NOT_FOUND, "Failed to update user's password", 'Falha ao atualizar senha do usuário');
    }
    return new ResponseDTO(HttpStatus.OK, 'User updated successfully', 'Sua senha foi alterada com sucesso!', user);
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
