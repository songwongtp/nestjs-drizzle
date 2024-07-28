import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './_dto';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private repository: AppRepository) {}

  createUser({ name, age, email }: CreateUserDto) {
    return this.repository.createUser(name, age, email);
  }

  getUsers() {
    return this.repository.getUsers();
  }
}
