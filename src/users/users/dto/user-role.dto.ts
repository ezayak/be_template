import { IsEnum } from 'class-validator';
import { UserRoles } from '../user.model';

export class UserRoleDto {
  @IsEnum(UserRoles)
  role: UserRoles;
}
