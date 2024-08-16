import { UserEntity } from 'src/user/user.entity';

export class TokenPayloadDTO {
  id: number;
  email: string;
  cpf: string;

  static constructorBasedOnEntity(userEntity: UserEntity) {
    return new TokenPayloadDTO(Number(userEntity.id), userEntity.email, userEntity.cpf);
  }

  constructor(id: number, email: string, cpf: string) {
    this.id = id;
    this.email = email;
    this.cpf = cpf;
  }

  static matchesObject(data: object): boolean {
    if (!data) return false;
    const keys = Object.keys(data);
    if (!keys.includes('id')) return false;
    return true;
  }
}
