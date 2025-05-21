import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './module/rabbitmq/rabbitmq.module';
import { RabbitmqService } from './module/rabbitmq/rabbitmq.service';
import { RegistrationsModule } from './module/registrations/registrations.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'register_db',
      port: 5432,
      username: 'registerservice',
      password: 'register',
      database: 'registerdb',
      entities: ['src/module/registrations' + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RegistrationsModule,
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule { }
