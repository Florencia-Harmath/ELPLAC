/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fair } from "src/entitys/fairs.entity";
import { FairsController } from "./fairs.controller";
import { FairsRepository } from "./fairs.repository";
import { FairsService } from "./fairs.service";

@Module({
    imports: [TypeOrmModule.forFeature([Fair])],
    controllers: [FairsController],
    providers: [FairsRepository, FairsService],
    exports: []
})

export class FairsModule {}