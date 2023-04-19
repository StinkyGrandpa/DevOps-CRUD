import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Put, UseGuards } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) { }

  @ApiBody({ type: CreateUserDto, description: 'Erstelle einen neuen Nutzer' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBody({ description: 'Gib alle Nutzer zurück' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBody({ description: 'Gib einen spezifischen Nutzer zurück' 
})
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @ApiBody({ type: UpdateUserDto, description: 'Update einen spezifischen Nutzer' })

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBody({ description: 'Sperre einen spezifischen Nutzer' })
  @Put(':id/lock')
  @UseGuards(JwtAuthGuard)
  lock(@Param('id') id: string) {
    return this.usersService.lock(id);
  }

  @ApiBody({ description: 'Entsperre einen spezifischen Nutzer' })
  @Put(':id/unlock')
  @UseGuards(JwtAuthGuard)
  unlock(@Param('id') id: string) {
    return this.usersService.unlock(id);
  }

  @ApiBody({ description: 'Lösche einen spezifischen Nutzer' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
