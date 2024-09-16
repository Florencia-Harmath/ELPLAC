/* eslint-disable prettier/prettier */


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fair } from './fairs.entity';
import { Seller } from './sellers.entity';

@Entity()
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  transactionDate: Date;

  @Column()
  transactionType: string;

  @ManyToOne(() => Seller)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => Fair, (fair) => fair.transactions)
  @JoinColumn()
  fair: Fair;
}
