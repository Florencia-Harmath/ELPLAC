/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { SellersRepository } from "./sellers.repository";
import { Seller } from "src/entitys/sellers.entity";

@Injectable()
export class SellersService {
    constructor (private readonly sellersRepository: SellersRepository){}

    async getAllSellers(){
        return await this.sellersRepository.getAllSellers();
    }

    async registerFair(sellerId: string, fairId: string, fairCategoryId: string, liquidation: any){
        return await this.sellersRepository.registerFair(sellerId, fairId, fairCategoryId, liquidation);
    }

    async getSellerById(id: string){
        return await this.sellersRepository.getSellerById(id);
    }   

    async updateSeller(id: string, seller: Partial<Seller>){
        return await this.sellersRepository.updateSeller(id, seller);
    }
}