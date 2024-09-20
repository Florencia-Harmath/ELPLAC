/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { SellersController } from "./sellers.controller";
import { SellersRepository } from "./sellers.repository";
import { SellersService } from "./sellers.service";

@Module({
    imports: [],
    controllers: [SellersController],
    providers: [SellersRepository, SellersService],
    exports: [],
})

export class SellersModule { }