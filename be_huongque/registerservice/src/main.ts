import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Eureka } from 'eureka-js-client';
async function bootstrap() {
  // Create Nest app (with Express)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Register Service')
    .setDescription('The Register Service API description')
    .setVersion('1.0')
    .addTag('register')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start microservices (if you have any)
  await app.startAllMicroservices();

  // Start HTTP server
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);

  // Register with Eureka
  const client = new Eureka({
    instance: {
      app: 'registerservice',
      instanceId: `registerservice:${port}`,
      hostName: 'registerservice',
      ipAddr: 'registerservice',
      port: {
        '$': port,
        '@enabled': true,
      },
      vipAddress: 'registerservice',
      statusPageUrl: `http://registerservice:${port}/info`,
      healthCheckUrl: `http://registerservice:${port}/health`,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: process.env.EUREKA_HOST || 'eurekaserver',
      port: process.env.EUREKA_PORT ? parseInt(process.env.EUREKA_PORT, 10) : 8761,
      servicePath: '/eureka/',
      preferIpAddress: true
    },
  });


  client.start((error) => {
    if (error) {
      console.error('Eureka registration failed:', error);
    } else {
      console.log(`NestJS service registered with Eureka at port ${port}!`);
    }
  });
}
bootstrap();