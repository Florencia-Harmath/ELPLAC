/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, MaxLength, IsString, IsEmail, Matches } from 'class-validator';

export class RegisterUserDTO {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
      message: 'La contraseña es muy debil',
    })
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, {
      message: 'La contraseña es muy debil',
    })
    @IsString()
    confirmPassword: string;
}