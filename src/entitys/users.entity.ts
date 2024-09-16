/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';
import { Role } from 'src/guards/roles.enum';
import { UserStatusGeneral } from 'src/enums/statusUsers.enum';
import { UserFairRegistration } from './userFairRegistration.entity';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column( { default: Role.USER } )
  role: Role.USER;

  @Column({ default: new Date() })
  registration_date: Date;

  @Column({ default: UserStatusGeneral.INACTIVE })
  statusGeneral: UserStatusGeneral;

  @OneToMany(() => UserFairRegistration, (registration) => registration.user)
  registrations: UserFairRegistration[]; 
}
