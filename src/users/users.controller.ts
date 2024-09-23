/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "src/guards/roles.decorator";
import { Role } from "src/guards/roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { User } from "src/entitys/users.entity";
import { RegisterUserFairDTO } from "src/dto/registerUserFair.dto";

@Controller("users")
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    //obtener todos los usuarios
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    //registro de usuario en feria
    @UseGuards(AuthGuard)
    @Post('registerFair/:userId/:fairId')
    async registerFair (
        @Param('userId') userId: string,
        @Param('fairId') fairId: string,
        @Body() registerUser: RegisterUserFairDTO,
    ) {
        return await this.usersService.registerFair(
            fairId,
            userId,
            registerUser,
          );
    }

    //obtener un usuario por id
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.usersService.getUserById(id)
    }

    //editar un usuario
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
        return await this.usersService.updateUser(id, user)
    }
}