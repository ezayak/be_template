import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/users/user.entity';
import { Repository } from 'typeorm';
import * as authSecret from './secret-keys/secretOrKey.json';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    console.log('token ', authSecret.secretOrKey2);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authSecret.secretOrKey2,
    });
  }

  async validate(payload): Promise<User> {
    console.log('payload', payload);
    const user: User = await this.userRepository.findOne({
      where: { phoneNumber: payload.phone_number },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
