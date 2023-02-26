import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../user-roles';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsNotEmpty()
  phoneNumber: string;
}
