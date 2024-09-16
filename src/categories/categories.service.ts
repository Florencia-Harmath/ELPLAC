/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CategoryDTO } from "src/dto/category.dto";
import { CategoriesRepository } from "./categories.repository";

@Injectable()
export class CategoriesService {

    constructor(
        private readonly categoriesRepository: CategoriesRepository
    ) {}

    async createCategory(category: CategoryDTO){
        return await this.categoriesRepository.createCategory(category)
    }

    async getAllCategories(){
        return await this.categoriesRepository.getAllCategories()
    }   

    async getCategory(id: string){
        return await this.categoriesRepository.getCategory(id)
    }   

    async updateCategory(category: CategoryDTO, id: string){
        return await this.categoriesRepository.updateCategory(category, id)
    }

    async deleteCategory(id: string){
        return await this.categoriesRepository.deleteCategory(id)
    }
}