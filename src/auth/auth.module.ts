/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entitys/users.entity";
import { Seller } from "src/entitys/sellers.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, Seller
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository],
    exports: [],
})

export class AuthModule {}