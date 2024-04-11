import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  roomCount: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pricePerDay: number;
}
