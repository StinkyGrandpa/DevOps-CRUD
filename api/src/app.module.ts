import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        ".env.dev",
        ".env"
      ]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mariadb',
          database: config.get("DB_NAME"),
          //only for Debug or it will completly wrap the Database on each change
          synchronize: true,
          host: config.get("DB_HOST"),
          port: config.get("DB_PORT"),
          username: config.get("DB_USER"),
          password: config.get("DB_PASS"),
          logging: config.get("DB_LOG_SQL") == 'true',
          autoLoadEntities: true,
        }
      }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
