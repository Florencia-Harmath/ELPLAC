/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDTO {
    @IsNotEmpty()
    @IsString()
    name: string
}