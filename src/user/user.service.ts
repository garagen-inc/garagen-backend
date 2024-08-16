import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map((u) => new UserDTO(u.id, u.name, u.email, u.phone, u.cpf, u.workshop_id, u.workshop, u.appointments));
  }

  async create(data: CreateUserDTO): Promise<UserDTO> {
    const userEntity = await this.userRepository.find({ where: { cpf: data.cpf } });
    if (userEntity[0]) return null;

    const user = data;
    user.password = await bcrypt.hash(data.password, this.saltRounds);
    const userCreated = await this.userRepository.save(user);

    return new UserDTO(userCreated.id, userCreated.name, userCreated.email, userCreated.phone, userCreated.cpf, userCreated.workshop_id, userCreated.workshop, userCreated.appointments);
  }
}
