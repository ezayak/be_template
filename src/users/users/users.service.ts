import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRoles } from './user.model';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '842a9985-9fd3-4db5-8547-b0993a518dc7',
      name: 'Olena',
      lastname: 'Grynevych',
      role: UserRoles.amdin,
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { name, lastname, role } = createUserDto;
    const user: User = {
      id: uuid(),
      name,
      lastname,
      role,
    };

    this.users.push(user);

    return user;
  }

  deleteUser(id: string): boolean {
    const findIndex = this.users.findIndex((user) => user.id === id);

    if (findIndex === -1) {
      throw new NotFoundException();
    }

    this.users.splice(findIndex);
    return true;
  }

  updateUser(updateUserDto: UpdateUserDto): boolean {
    const findIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );

    if (findIndex === -1) {
      throw new NotFoundException();
    }

    this.users[findIndex] = updateUserDto;
    return true;
  }

  updateRole(id: string, role: UserRoles): boolean {
    const user = this.getUserById(id);
    user['role'] = role;

    return true;
  }
}
