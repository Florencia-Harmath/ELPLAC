/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  rememberMe: boolean;
}
