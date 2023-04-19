import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ nullable: false, description: 'Benutzername' })
    @IsString()
    username: string

    @ApiProperty({ nullable: false, description: 'Passwort' })
    @IsString()
    password: string
}
