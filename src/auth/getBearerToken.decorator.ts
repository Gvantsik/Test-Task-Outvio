import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetBearerToken = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.rawHeaders[1].slice(7);
    return token;
  },
);
