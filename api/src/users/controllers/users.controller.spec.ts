import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

const users: User[] = [
  { id: "123", firstName: "Max", lastName: "Mustermann", age: 18, enabled: true }
]

describe('AppController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(controller.findAll()).toBe(users);
    // });
  });
});
