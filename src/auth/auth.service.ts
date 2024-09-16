/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { LoginUserDTO } from "src/dto/loginUser.dto";
import { RegisterUserDTO } from "src/dto/user.dto";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor ( 
        private readonly authRepository: AuthRepository,
    ){}
    
    async RegisterUser (user: RegisterUserDTO) {
       return await this.authRepository.RegisterUser(user)
    }

    async RegisterSeller (seller: RegisterUserDTO) {
       return await this.authRepository.RegisterSeller(seller)
    }

    async Login (login: LoginUserDTO) {
       return await this.authRepository.Login(login)
    }
}