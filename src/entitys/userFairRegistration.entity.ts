/* eslint-disable prettier/prettier */
import { Fair } from './fairs.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './users.entity';

@Entity({ name: 'user_fair_registration' })
export class UserFairRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  registrationDate: Date;

  @Column()
  entryFee?: number;

  @Column()
  registrationDay: Date;

  @Column()
  registrationHour: string;

  @ManyToOne(() => User, (user) => user.registrations)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Fair, (fair) => fair.userRegistrations)
  @JoinColumn()
  fair: Fair;
}
