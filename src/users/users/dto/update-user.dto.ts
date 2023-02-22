import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../user.model';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}
