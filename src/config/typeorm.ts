/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

import { config as dotenvConfig } from 'dotenv';

import { Category } from 'src/entitys/category.entity';
import { FairCategory } from 'src/entitys/fairCategory.entity';
import { FairDay } from 'src/entitys/fairDays.entity';
import { Fair } from 'src/entitys/fairs.entity';
import { PaymentTransaction } from 'src/entitys/payment.entity';
import { Product } from 'src/entitys/products.entity';
import { ProductRequest } from 'src/entitys/productsRequest.entity';
import { SellerFairRegistration } from 'src/entitys/sellerFairRegistration.entity';
import { UserFairRegistration } from 'src/entitys/userFairRegistration.entity';
import { User } from 'src/entitys/users.entity';
import { Seller } from 'src/entitys/sellers.entity';
import { UsersCapacity } from 'src/entitys/userCapacity.entity';

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: 'postgres',
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    synchronize: true,
    //dropSchema: true,
    logging: false,
    entities: [Category, FairCategory, FairDay, Fair, PaymentTransaction, Product, ProductRequest, SellerFairRegistration, UserFairRegistration, User, Seller, UsersCapacity],
    migrations: ['dist/migrations/*{.ts,.js}'],
    ssl: false
}

export default registerAs('typeorm', ()=> config);
export const connectionSource = new DataSource (config as DataSourceOptions)