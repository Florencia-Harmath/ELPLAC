/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FairCategory } from './fairCategory.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @OneToMany(() => FairCategory, fairCategory => fairCategory.category)
  fairCategories: FairCategory[] | FairCategory;
}
