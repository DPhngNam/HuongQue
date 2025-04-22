import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationsModule } from './module/registrations/registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env', // Specify the path to your .env file
      isGlobal: true, // Makes the ConfigModule global (optional)
    }),
    RegistrationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
