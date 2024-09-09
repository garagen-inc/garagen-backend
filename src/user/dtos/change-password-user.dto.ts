export class ChangePasswordUserDTO {
  id: number;
  password?: string;

  constructor(id: number, password: string) {
    this.id = id;
    if (password) this.password = password;
  }
}
