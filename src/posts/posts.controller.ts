import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetBearerToken } from 'src/auth/getBearerToken.decorator';
import { isOverLimit } from 'src/limiter/redis';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: string, @GetBearerToken() token: string) {
    const overLimit = await isOverLimit(token, process.env.TOKEN_LIMIT);
    return overLimit ? overLimit : this.postsService.create(createPostDto);
  }

  @Get()
  public async findAll(@Req() req) {
    const overLimit = await isOverLimit(req.ip, process.env.IP_LIMIT);
    return overLimit ? overLimit : this.postsService.findAll();
  }
}
