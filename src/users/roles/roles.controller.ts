import { Controller, Body, Post } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post()
  createRole(@Body('name') name: string) {
    this.rolesService.createRole(name);
  }
}
