import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty({ nullable: true, description: 'Vorname' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ nullable: true, description: 'Nachname' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    nullable: true,
    minimum: 1,
    default: null, description: 'Alter'
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ nullable: true, description: 'Gesperrt' })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
