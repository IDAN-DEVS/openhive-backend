import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';
import { ENVIRONMENT } from '../../../../common/configs/environment';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVIRONMENT.JWT.SECRET,
    });
  }

  async validate(req: Request, payload: Partial<{ _id: string }>) {
    const { _id } = payload;

    // const token = req.headers.authorization.replace('Bearer', ''); // TODO: use later

    const user = await this.userService.getUser(_id);

    if (!user) {
      throw new UnauthorizedException('Session expired.');
    }

    return user;
  }
}
