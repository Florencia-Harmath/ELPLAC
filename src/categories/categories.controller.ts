/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryDTO } from "src/dto/category.dto";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    //crear una categoria
    @Post()
    async createCategory(@Body() category: CategoryDTO) {
        return await this.categoriesService.createCategory(category)
    }

    //obtener todas las categorias
    @Get()
    async getAllCategories() {
        return await this.categoriesService.getAllCategories()
    }

    //obtener una categoria
    @Get(":id")
    async getCategory(@Param('id') id: string) {
        return await this.categoriesService.getCategory(id)
    }

    //editar una categoria
    @Put("update/:id")
    async updateCategory(@Body() category: CategoryDTO, @Param('id') id: string) {  
        return await this.categoriesService.updateCategory(category, id)
    }

    //borrar una categoria
    @Delete("delete/:id")
    async deleteCategory(@Param('id') id: string) {
        return await this.categoriesService.deleteCategory(id)
    }

}