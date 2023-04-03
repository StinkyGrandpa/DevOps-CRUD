import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Put } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBody({ type: CreateUserDto, description: 'Erstelle einen neuen Nutzer' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBody({ description: 'Gib alle Nutzer zurück' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBody({ description: 'Gib einen spezifischen Nutzer zurück' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @ApiBody({ type: UpdateUserDto, description: 'Update einen spezifischen Nutzer' })

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBody({ description: 'Sperre einen spezifischen Nutzer' })
  @Put(':id/lock')
  lock(@Param('id') id: string) {
    return this.usersService.lock(id);
  }

  @ApiBody({ description: 'Entsperre einen spezifischen Nutzer' })

  @Put(':id/unlock')
  unlock(@Param('id') id: string) {
    return this.usersService.unlock(id);
  }

  @ApiBody({ description: 'Lösche einen spezifischen Nutzer' })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
