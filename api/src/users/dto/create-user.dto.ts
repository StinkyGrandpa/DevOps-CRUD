import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ nullable: false, description: 'Vorname' })
  @IsString()
  firstName: string;

  @ApiProperty({ nullable: false, description: 'Nachname' })
  @IsString()
  lastName: string;

  @ApiProperty({
    nullable: true,
    minimum: 1,
    default: null, description: 'Alter'
  }) @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ nullable: false, description: 'Gesperrt' })
  @IsOptional()
  @IsBoolean()
  enabled: boolean;
}
