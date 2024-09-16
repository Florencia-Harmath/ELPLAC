/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FairDay } from './fairDays.entity';

@Entity({ name: 'users_capacity' })
export class UsersCapacity {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  hour: string;

  @Column({ default: 10 })
  capacity: number;

  @ManyToOne(() => FairDay, fairDay => fairDay.usersCapacity)
  fairDay: FairDay;
}

