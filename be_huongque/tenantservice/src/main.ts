import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Eureka } from 'eureka-js-client';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // Register with Eureka - with delay to ensure Eureka server is ready
  console.log('Waiting for Eureka server to be ready before registering...');
  setTimeout(() => {
    const eurekaHost = process.env.EUREKA_HOST ?? 'localhost';
    const eurekaPort = process.env.EUREKA_PORT ? parseInt(process.env.EUREKA_PORT, 10) : 8761;
    const hostName = process.env.HOSTNAME ?? 'localhost';
    
    console.log(`Attempting to register with Eureka at ${eurekaHost}:${eurekaPort}`);
    
    const client = new Eureka({
      instance: {
        app: 'tenantservice',
        instanceId: `tenantservice:${port}`,
        hostName: hostName,
        ipAddr: hostName,
        port: {
          '$': port,
          '@enabled': true,
        },
        vipAddress: 'tenantservice',
        statusPageUrl: `http://${hostName}:${port}/info`,
        healthCheckUrl: `http://${hostName}:${port}/health`,
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: eurekaHost,
        port: eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: 10,         // Increased retries
        requestRetryDelay: 10000, // Longer delay between retries
        registryFetchInterval: 30000,
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
  }, 30000); // Wait 30 seconds for Eureka server to be ready
}
bootstrap();
