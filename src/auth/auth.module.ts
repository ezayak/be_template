import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users/user.entity';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthStrategy],
  exports: [AuthStrategy, PassportModule],
})
export class AuthModule {}
