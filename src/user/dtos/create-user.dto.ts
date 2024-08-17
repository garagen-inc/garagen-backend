export class CreateUserDTO {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;

  constructor(name: string, email: string, phone: string, cpf: string, password: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpf = cpf;
    this.password = password;
  }
}
