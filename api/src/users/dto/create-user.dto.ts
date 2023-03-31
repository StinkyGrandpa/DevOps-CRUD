import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsBoolean()
  enabled: boolean;
}
