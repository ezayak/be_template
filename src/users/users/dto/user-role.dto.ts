import { IsEnum } from 'class-validator';
import { UserRoles } from '../user-roles';

export class UserRoleDto {
  @IsEnum(UserRoles)
  role: UserRoles;
}
