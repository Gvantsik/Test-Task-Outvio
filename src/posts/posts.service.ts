import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  create(createPostDto: string) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }
}
