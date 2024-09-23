/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { SellersController } from "./sellers.controller";
import { SellersRepository } from "./sellers.repository";
import { SellersService } from "./sellers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seller } from "src/entitys/sellers.entity";
import { Product } from "src/entitys/products.entity";
import { Fair } from "src/entitys/fairs.entity";
import { SellerFairRegistration } from "src/entitys/sellerFairRegistration.entity";
import { Category } from "src/entitys/category.entity";
import { FairDay } from "src/entitys/fairDays.entity";
import { FairCategory } from "src/entitys/fairCategory.entity";
import { User } from "mercadopago";
import { UserFairRegistration } from "src/entitys/userFairRegistration.entity";
import { UsersCapacity } from "src/entitys/userCapacity.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Seller,
        Product,
        Fair,
        SellerFairRegistration,
        Category,
        FairDay,
        FairCategory,
        User,
        UserFairRegistration,
        UsersCapacity
    ])],
    controllers: [SellersController],
    providers: [SellersRepository, SellersService],
    exports: [],
})

export class SellersModule { }