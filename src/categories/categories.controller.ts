/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CategoryDTO } from "src/dto/category.dto";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/guards/roles.decorator";
import { Role } from "src/guards/roles.enum";

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    //crear una categoria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
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
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put("update/:id")
    async updateCategory(@Body() category: CategoryDTO, @Param('id') id: string) {  
        return await this.categoriesService.updateCategory(category, id)
    }

    //borrar una categoria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Delete("delete/:id")
    async deleteCategory(@Param('id') id: string) {
        return await this.categoriesService.deleteCategory(id)
    }

}