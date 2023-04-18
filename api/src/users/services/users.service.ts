import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  async onApplicationBootstrap() {
    await this.initDb()
  }
  async initDb() {
    const admin = await this.findOneByUsername('root')
    console.log(admin)
    if (admin) return

    this.create({
      enabled: true,
      firstName: 'root',
      lastName: 'root',
      password: 'root',
      username: 'root'
    })
  }
  create(createUserDto: CreateUserDto) {
    if (createUserDto.age <= 0) createUserDto.age = null;
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 12)

    this.userRepository.save(createUserDto)
    return true
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.age <= 0) updateUserDto.age = null;

    return (await this.userRepository.update(id,
      {
        age: updateUserDto.age,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        enabled: updateUserDto.enabled,
        password: bcrypt.hashSync(updateUserDto.password, 12),
        username: updateUserDto.username,
      }
    )).affected > 0 ? true : false
    /*
    return this.userRepository.createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where("id = :id", { id: id })
      .execute().then(x => { console.log(x) })
    */
  }

  async remove(id: string) {
    return (await this.userRepository.delete(id)).affected > 0 ? true : false;
  }

  async lock(id: string) {
    return (await this.userRepository.update(id, { enabled: false })).affected > 0 ? true : false
  }

  async unlock(id: string) {
    return (await this.userRepository.update(id, { enabled: true })).affected > 0 ? true : false
  }
}
