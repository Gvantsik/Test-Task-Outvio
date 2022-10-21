import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest() as Request;
      const token = (request.headers['authorization'] || '').split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      const userToken = process.env.ACCESS_TOKEN;

      if (userToken !== token) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
