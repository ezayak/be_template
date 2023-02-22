import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../user.model';

export class GetUsersFilterDto {
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;

  @IsOptional()
  @IsString()
  search?: string;
}
