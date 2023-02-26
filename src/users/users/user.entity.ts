import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRoles } from './user-roles';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  lastname: string;

  @Column('varchar', { length: 64 })
  role: UserRoles;

  @Column('varchar', { length: 32 })
  phoneNumber: string;
}
