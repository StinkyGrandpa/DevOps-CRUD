import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ description: 'Login Routine' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @ApiBody({ description: 'Validiert den Token' })
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate() {
    return this.authService.validate();
  }
}
