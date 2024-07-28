import { Injectable } from '@nestjs/common';
import {
  CreatePostDto,
  CreateUserDto,
  DeletePostDto,
  GetAuthorPostCountDto,
  GetPostsDto,
  SaveUserPreferenceDto,
  UpdateUserDto,
} from './_dto';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  constructor(private repository: AppRepository) {}

  createUser({ name, age, email }: CreateUserDto) {
    return this.repository.createUser(name, age, email);
  }

  updateUser({ id, age, email }: UpdateUserDto) {
    return this.repository.updateUser(id, age, email);
  }

  saveUserPreference({ userId, emailUpdatable }: SaveUserPreferenceDto) {
    return this.repository.saveUserPreference(userId, emailUpdatable);
  }

  getUsers() {
    return this.repository.getUsers();
  }

  createPost({ authorId, title }: CreatePostDto) {
    return this.repository.createPost(authorId, title);
  }

  getPosts({ authorId }: GetPostsDto) {
    return this.repository.getPosts(authorId);
  }

  getAuthorPostCount({ withCountAtLeast }: GetAuthorPostCountDto) {
    return this.repository.getAuthorPostCount(withCountAtLeast);
  }

  deletePost({ postId }: DeletePostDto) {
    return this.repository.deletePost(postId);
  }
}
