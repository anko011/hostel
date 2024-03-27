import { CreateUserRequest } from '@/users/presentation/http/dto/create-user.request';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest extends CreateUserRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;
}
