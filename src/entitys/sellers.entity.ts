/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './products.entity';
import { SellerFairRegistration } from './sellerFairRegistration.entity';
import { ProductRequest } from './productsRequest.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'src/guards/roles.enum';
import { UserStatusGeneral } from 'src/enums/statusUsers.enum';

@Entity({ name: 'sellers' })
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column( { default: Role.SELLER } )
  role: Role.SELLER;

  @Column({ default: new Date() })
  registration_date: Date;

  @Column({ default: UserStatusGeneral.INACTIVE })
  statusGeneral: UserStatusGeneral;

  @OneToMany(() => Product, (product) => product.seller)
  @JoinColumn()
  products: Product[];

  @OneToMany(
    () => SellerFairRegistration,
    (registration) => registration.seller,
  )
  registrations: SellerFairRegistration[];

  @OneToMany(() => ProductRequest, (productRequests) => productRequests.seller)
  @JoinColumn()
  productRequests: ProductRequest;
}
