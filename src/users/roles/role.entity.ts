import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 64 })
  name: string;

  @Column('bool')
  isActive: boolean;

  @Column('bool')
  isToDelete: boolean;

  // @Column()
  // @OneToMany(() => User, (user) => user.id)
  // user: User[];
}
