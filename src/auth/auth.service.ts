import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { createApiResponse } from 'src/utils/api-response.util';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { name: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    } else {
      return false;
    }
  }
}
