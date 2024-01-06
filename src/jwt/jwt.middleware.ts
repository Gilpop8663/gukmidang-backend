import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'].toString();

      const decoded = this.jwtService.verify(token);

      if (typeof decoded !== 'object' || !decoded.hasOwnProperty('id')) {
        next();

        return;
      }

      const user = this.userService.findById(decoded['id']);
      req['user'] = user;
    }

    next();
  }
}
