/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { FairsService } from "./fairs.service";
import { FairDTO } from "src/dto/fair.dto";

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
    @Put(":id")
    async updateFairs(@Param("id") id: string, @Body() fair: Partial<FairDTO>){
        return await this.fairsService.updateFairs(id, fair);
    }

    //borrar una feria
    @Get("delete/:id")
    async deleteFairs(@Param("id") id: string){
        return await this.fairsService.deleteFairs(id);
    }

    //cerrar una feria
    @Put("close/:id")
    async closeFairs(@Param("id") id: string){
        return await this.fairsService.closeFairs(id);
    }
}