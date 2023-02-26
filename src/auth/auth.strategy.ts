import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/users/user.entity';
import { Repository } from 'typeorm';
import * as authSecret from './secret-keys/secretOrKey.json';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authSecret.secretOrKey,
    });
  }

  async validate(payload): Promise<User> {
    console.log(payload);
    //here should extract information about user from database
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber: payload.phone_number },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
