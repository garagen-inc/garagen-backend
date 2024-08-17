import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDTO } from './dto/token-payload.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { UserDTO } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async generateAccessToken(user: UserEntity) {
    return this.jwtService.sign(
      {
        payload: new TokenPayloadDTO(user.id, user.email, user.cpf),
      },
      { secret: process.env.JWT_SECRET },
    );
  }

  async login(loginDto: LoginDTO): Promise<LoginResponseDTO | null> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const access_token = await this.generateAccessToken(user);
      const userDTO = new UserDTO(user.id, user.name, user.email, user.phone, user.cpf, user.workshop_id, user.workshop);
      return new LoginResponseDTO(access_token, userDTO);
    } else {
      return null;
    }
  }
}
