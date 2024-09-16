/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDTO } from "src/dto/user.dto";
import { LoginUserDTO } from "src/dto/loginUser.dto";

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

     @Post('register/user')
     async RegisterUser (@Body() user: RegisterUserDTO) {
        return await this.authService.RegisterUser(user);
     }
     
     @Post('register/seller')
     async RegisterSeller (@Body() seller: RegisterUserDTO) {
        return await this.authService.RegisterSeller(seller);
     }

     @Post('login')
     async Login (@Body() login: LoginUserDTO ) {
        return await this.authService.Login(login);
     }
}