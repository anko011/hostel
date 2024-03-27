import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshRequest {
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
