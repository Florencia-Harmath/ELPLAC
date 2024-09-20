/* eslint-disable prettier/prettier */

import { IsArray, IsNotEmpty, IsString, IsNumber, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDTO } from './category.dto';


export class FairCategoryDto {
  @IsNumber()
  maxProductsSeller: number;

  @IsNumber()
  minProductsSeller: number;

  @IsNumber()
  maxProducts: number;

  @IsNumber()
  maxSellers: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  category: CategoryDTO[];
}

export class FairDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  entryPriceSeller: number;

  @IsNumber()
  entryPriceBuyer: number;

  @IsString()
  @IsNotEmpty()
  entryDescription: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FairCategoryDto)
  fairCategories: FairCategoryDto[];

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsNumber()
  timeSlotInterval: number;

  @IsNumber()
  capacityPerTimeSlot: number;
}

