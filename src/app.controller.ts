import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, SaveUserPreferenceDto } from './_dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Post('/save-user-preference')
  saveUserPreference(@Body() saveUserPreferenceDto: SaveUserPreferenceDto) {
    return this.appService.saveUserPreference(saveUserPreferenceDto);
  }

  @Get('/users')
  getUser() {
    return this.appService.getUsers();
  }
}
