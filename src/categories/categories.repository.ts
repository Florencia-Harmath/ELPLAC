/* eslint-disable prettier/prettier */
import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryDTO } from "src/dto/category.dto";
import { Category } from "src/entitys/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository {

    constructor(
        @InjectRepository(Category) private readonly categoryDB: Repository<Category>,
    ) {}

    async createCategory(category: CategoryDTO) {
        const newCategory = this.categoryDB.findOne({ where: { name: category.name } })
        if (newCategory) throw new Error('La categoria ya existe')

        const newCategory2 = this.categoryDB.create(category)
        if (!newCategory2) throw new Error('Error al crear la categoria')

        await this.categoryDB.save(newCategory2)
        return newCategory2;
    }

    async getAllCategories() {
        const categories = await this.categoryDB.find()
        if (!categories) throw new Error('No se encontraron categorias')

        return categories
    }

    async getCategory(id: string) {
        const category = await this.categoryDB.findOne({ where: { id: id } })
        if (!category) throw new Error('La categoria no existe')

        return category 
    }

    async updateCategory(category: CategoryDTO, id: string) {
        const categoryFind = await this.categoryDB.findOne({ where: { id: id } })
        if (!categoryFind) throw new Error('La categoria no existe')

        Object.assign(categoryFind, category);
        await this.categoryDB.save(categoryFind)

        return categoryFind;
    }

    async deleteCategory(id: string) {
        const categoryFind = await this.categoryDB.findOne({ where: { id: id } })
        if (!categoryFind) throw new Error('La categoria no existe')

        await this.categoryDB.delete(id)
        return "Categoria eliminada"
    }

}