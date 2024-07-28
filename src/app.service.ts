import { Injectable } from '@nestjs/common';
import { CreateUserDto, SaveUserPreferenceDto } from './_dto';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private repository: AppRepository) {}

  createUser({ name, age, email }: CreateUserDto) {
    return this.repository.createUser(name, age, email);
  }

  saveUserPreference({ userId, emailUpdatable }: SaveUserPreferenceDto) {
    return this.repository.saveUserPreference(userId, emailUpdatable);
  }

  getUsers() {
    return this.repository.getUsers();
  }
}
