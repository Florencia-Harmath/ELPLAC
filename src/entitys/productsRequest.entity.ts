/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './products.entity';
import { v4 as uuid } from 'uuid';
import { Fair } from './fairs.entity';
import { StatusProductRequest } from 'src/enums/statusProductRequest.entity';
import { Seller } from './sellers.entity';


@Entity()
export class ProductRequest {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();
  
    @Column()
    category: string;
    
    @Column()
    status: StatusProductRequest;
    
    @ManyToOne(() => Seller, (seller) => seller.productRequests)
    seller: Seller;

    @OneToMany(() => Product, (product) => product.productRequest)
    products: Product[];

    @ManyToOne(() => Fair, (fair) => fair.productRequests)
    fair: Fair;
}