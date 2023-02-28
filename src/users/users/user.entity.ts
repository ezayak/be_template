import { IsDate, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  lastname: string;

  @Column('varchar', { length: 64 })
  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  role: Role;

  @Column('varchar', { length: 32 })
  @IsPhoneNumber()
  phoneNumber: string;

  @Column('varchar', { length: 64 })
  @IsEmail()
  email: string;

  @Column('date')
  @IsDate()
  @IsOptional()
  dob: Date;

  @Column('varchar', { length: 32 })
  @IsOptional()
  comments: string;

  @Column('bool')
  isActive: boolean;

  @Column('bool')
  isToDelete: boolean;
}
