/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { FairsRepository } from "./fairs.repository";
import { FairDTO } from "src/dto/fair.dto";

 @Injectable()
export class FairsService {
    constructor(
        private readonly fairsRepository: FairsRepository
    ) {}

    async getAllFairs() {
        return await this.fairsRepository.getAllFairs();
    }

    async createFairs(fair: FairDTO) {
        return await this.fairsRepository.createFairs(fair);
    }

    async getFairsById(id: string) {
        return await this.fairsRepository.getFairsById(id);
    }

    async updateFairs(id: string, fair: Partial<FairDTO>) {
        return await this.fairsRepository.updateFairs(id, fair);
    }  

    async deleteFairs(id: string) {
        return await this.fairsRepository.deleteFairs(id);
    }

    async closeFairs(id: string) {
        return await this.fairsRepository.closeFairs(id);
    }
}