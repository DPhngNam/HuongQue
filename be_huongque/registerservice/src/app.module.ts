import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the path to your .env file
      isGlobal: true, // Makes the ConfigModule global (optional)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
