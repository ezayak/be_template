import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRoles } from './user.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  role: UserRoles;
}
