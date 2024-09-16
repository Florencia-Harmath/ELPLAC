/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserFairRegistration } from './userFairRegistration.entity';
import { SellerFairRegistration } from './sellerFairRegistration.entity';
import { FairCategory } from './fairCategory.entity';
import { FairDay } from './fairDays.entity';
import { ProductRequest } from './productsRequest.entity';
import { PaymentTransaction } from './payment.entity';

@Entity({ name: 'fair' })
export class Fair {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  entryPriceSeller: number;

  @Column({default : true})
  isActive: boolean;

  @Column()
  entryPriceBuyer: number;

  @Column()
  entryDescription: string;

  @OneToMany(() => FairDay, fairDay => fairDay.fair)
  fairDays: FairDay[];

  @OneToMany(() => UserFairRegistration, registrations => registrations.fair)
  userRegistrations: UserFairRegistration[];

  @OneToMany(() => SellerFairRegistration, registrations => registrations.fair)
  sellerRegistrations: SellerFairRegistration[];

  @OneToMany(() => PaymentTransaction, transaction => transaction.fair)
  transactions: PaymentTransaction[];

  @OneToMany(() => ProductRequest, productRequest => productRequest.fair)
  productRequests: ProductRequest[];

  @OneToMany(() => FairCategory, fairCategory => fairCategory.fair)
  fairCategories: FairCategory[] | FairCategory;
}
