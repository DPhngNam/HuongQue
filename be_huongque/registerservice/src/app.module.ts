import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationsModule } from './module/registrations/registrations.module';
import { RabbitmqModule } from './module/rabbitmq/rabbitmq.module';
import { RabbitmqService } from './module/rabbitmq/rabbitmq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './module/registrations/entities/registration.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RegistrationsModule,
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule { }
