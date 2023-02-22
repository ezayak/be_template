import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../user-roles';

export class UsersFilterDto {
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;

  @IsOptional()
  @IsString()
  search?: string;
}
