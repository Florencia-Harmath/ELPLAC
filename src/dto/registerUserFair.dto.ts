/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserFairDTO {
    @IsString()
    selectedHour: string;
  
    @IsNotEmpty()
    @Type(() => Date)
    selectedDay: Date; 
  }
  