import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreatePostDto,
  CreateUserDto,
  DeletePostDto,
  GetAuthorPostCountDto,
  GetPostsDto,
  SaveUserPreferenceDto,
  UpdateUserDto,
} from './_dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Post('/update-user')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(updateUserDto);
  }

  @Post('/save-user-preference')
  saveUserPreference(@Body() saveUserPreferenceDto: SaveUserPreferenceDto) {
    return this.appService.saveUserPreference(saveUserPreferenceDto);
  }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('/create-post')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.appService.createPost(createPostDto);
  }

  @Get('/posts/:authorId')
  getPosts(@Param() getPostsDto: GetPostsDto) {
    return this.appService.getPosts(getPostsDto);
  }

  @Get('/author-post-count')
  getAuthorPostCount(@Query() getAuthorPostCountDto: GetAuthorPostCountDto) {
    return this.appService.getAuthorPostCount(getAuthorPostCountDto);
  }

  @Post('/delete-post')
  deletePost(@Body() deletePostDto: DeletePostDto) {
    return this.appService.deletePost(deletePostDto);
  }
}
