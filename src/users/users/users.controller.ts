import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersFilterDto } from './dto/users-filter.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers(@Query() filterDto: UsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }

  // @Put()
  // updateUser(@Body() updateUser: UpdateUserDto): boolean {
  //   return this.usersService.updateUser(updateUser);
  // }

  @Patch('/:id/role')
  changeUserRole(
    @Param('id') id: string,
    @Body() userRoleDto: UserRoleDto,
  ): Promise<boolean> {
    const { role } = userRoleDto;
    return this.usersService.updateRole(id, role);
  }
}
