import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { User, UserRoles } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto): User[] {
    if (Object.keys(filterDto).length) {
      return this.getUsersByFilter(filterDto);
    } else {
      return this.usersService.getAllUsers();
    }
  }

  getUsersByFilter(filterDto: GetUsersFilterDto): User[] {
    let users = this.usersService.getAllUsers();
    const { search, role } = filterDto;

    if (search) {
      console.log('lena-dev search', search);

      users = users.filter((user) => {
        if (
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }

        return false;
      });
    }

    if (role) {
      users = users.filter((user) => user.role === role);
    }

    return users;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): boolean {
    return this.usersService.deleteUser(id);
  }

  @Put()
  updateUser(@Body() updateUser: UpdateUserDto): boolean {
    return this.usersService.updateUser(updateUser);
  }

  @Patch('/:id/role')
  changeUserRole(
    @Param('id') id: string,
    @Body() userRoleDto: UserRoleDto,
  ): boolean {
    const { role } = userRoleDto;
    return this.usersService.updateRole(id, role);
  }
}
