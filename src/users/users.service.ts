/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "src/entitys/users.entity";
import { RegisterUserFairDTO } from "src/dto/registerUserFair.dto";


@Injectable()
export class UsersService {
    constructor (private readonly usersRepository: UsersRepository) {}

    async getAllUsers() {
        return await this.usersRepository.getAllUsers()
    }

    async registerFair(userId: string, fairId: string, registerUser: RegisterUserFairDTO,) {
        return await this.usersRepository.registerFair(userId, fairId, registerUser)
    }

    async getUserById(id: string) {
        return await this.usersRepository.getUserById(id)
    }

    async updateUser(id: string, user: Partial<User>) {
        return await this.usersRepository.updateUser(id, user)
    }
}