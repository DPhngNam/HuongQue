import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './module/rabbitmq/rabbitmq.module';
import { RabbitmqService } from './module/rabbitmq/rabbitmq.service';
import { RegistrationsModule } from './module/registrations/registrations.module';
import { Registration } from './module/registrations/entities/registration.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'registerservice',
      password: process.env.DB_PASSWORD || 'register',
      database: process.env.DB_NAME || 'registerdb',
      entities: [Registration],
      synchronize: true,
    }),
    RegistrationsModule,
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule { }
