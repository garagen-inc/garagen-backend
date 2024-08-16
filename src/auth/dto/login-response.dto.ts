import { UserDTO } from 'src/user/dtos/user.dto';

export class LoginResponseDTO {
  access_token: string;
  user: UserDTO;

  constructor(accessToken: string, user: UserDTO) {
    this.access_token = accessToken;
    this.user = user;
  }
}
