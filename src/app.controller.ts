import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './_dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-user')
  getHello(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }
}
