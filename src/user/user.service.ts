import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list(): Promise<UserEntity[]> {
    return (await this.userRepository.find()).map((u) => {
      delete u.password;
      return u;
    });
  }

  async create(name: string, password: string): Promise<UserEntity> {
    const userEntity = this.userRepository.find({ where: { name } });

    if (userEntity) return null;

    const user = new UserEntity();
    user.name = name;
    user.password = await bcrypt.hash(password, this.saltRounds);

    const userCreated = await this.userRepository.save(user);
    delete userCreated.password;
    return userCreated;
  }
}
