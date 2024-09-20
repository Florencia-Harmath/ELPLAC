/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { FairsService } from "./fairs.service";
import { FairDTO } from "src/dto/fair.dto";
import { Roles } from "src/guards/roles.decorator";
import { Role } from "src/guards/roles.enum";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/guards/role.guard";

@Controller("fairs")
export class FairsController {
    constructor (
        private readonly fairsService: FairsService
    ){}

    //obtener todas las ferias
    @Get()
    async getAllFairs(){
        return await this.fairsService.getAllFairs();
    }

    //crear una feria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async createFairs(@Body() fair: FairDTO){
        return await this.fairsService.createFairs(fair);
    }

    //obtener una feria por id
    @Get(":id")
    async getFairsById(@Param("id") id: string){
        return await this.fairsService.getFairsById(id);
    }

    //editar una feria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put(":id")
    async updateFairs(@Param("id") id: string, @Body() fair: Partial<FairDTO>){
        return await this.fairsService.updateFairs(id, fair);
    }

    //borrar una feria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Get("delete/:id")
    async deleteFairs(@Param("id") id: string){
        return await this.fairsService.deleteFairs(id);
    }

    //cerrar una feria
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Put("close/:id")
    async closeFairs(@Param("id") id: string){
        return await this.fairsService.closeFairs(id);
    }
}