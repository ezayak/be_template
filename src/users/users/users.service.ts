import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersFilterDto } from './dto/users-filter.dto';
import { UserRoles } from './user-roles';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUsers(filterDto: UsersFilterDto): Promise<User[]> {
    const { search, role } = filterDto;
    const query = this.userRepository.createQueryBuilder('users');

    if (role) {
      query.andWhere('users.role = :role', { role });
    }

    if (search) {
      query.andWhere(
        'LOWER(users.name) LIKE :search OR LOWER(users.lastname) LIKE :search',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }

    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, lastname, role } = createUserDto;
    const userData = {
      name,
      lastname,
      role,
    };

    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }

  // updateUser(updateUserDto: UpdateUserDto): boolean {
  //   const findIndex = this.users.findIndex(
  //     (user) => user.id === updateUserDto.id,
  //   );

  //   if (findIndex === -1) {
  //     throw new NotFoundException();
  //   }

  //   this.users[findIndex] = updateUserDto;
  //   return true;
  // }

  async updateRole(id: string, role: UserRoles): Promise<boolean> {
    const user = await this.getUserById(id);
    user.role = role;
    await this.userRepository.save(user);
    return true;
  }
}
