import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: false, default: 1 })
  enabled: boolean;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @UpdateDateColumn()
  updatedAt: Date
}
