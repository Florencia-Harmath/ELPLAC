/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FairCategory } from './fairCategory.entity';
import { ProductStatus } from 'src/enums/productStatus.enum';
import { ProductRequest } from './productsRequest.entity';
import { Seller } from './sellers.entity';

@Entity({ name: 'products'})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column({default: false})
  liquidation: boolean;

  @Column()
  code: string;

  @Column({default: ProductStatus.PENDINGVERICATION})
  status: ProductStatus;

  @Column({default: 'sin categoria'})
  category: string;

  @ManyToOne(() => Seller, seller => seller.products)
  @JoinColumn()
  seller: Seller;

  @ManyToOne(() => ProductRequest, productRequest => productRequest.products)
  @JoinColumn()
  productRequest: ProductRequest;

  @ManyToOne(() => FairCategory, fairCategory => fairCategory.products )
  @JoinColumn()
  fairCategory: FairCategory
}