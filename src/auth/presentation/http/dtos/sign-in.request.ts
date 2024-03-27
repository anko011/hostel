import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(4)
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;
}
