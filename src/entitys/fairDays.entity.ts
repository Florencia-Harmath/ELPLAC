/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Fair } from './fairs.entity';
import { Exclude } from 'class-transformer';
import { UsersCapacity } from './userCapacity.entity';

@Entity({ name: 'fair_day' })
export class FairDay {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  day: Date;

  @ManyToOne(() => Fair, fair => fair.fairDays)
  @Exclude()
  fair: Fair;

  @OneToMany(() => UsersCapacity, usersCapacity => usersCapacity.fairDay)
  usersCapacity: UsersCapacity[];
}
