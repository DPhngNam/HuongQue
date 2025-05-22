import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FileUploadRequest, FileUploadResponse } from './config/rabbitconfig';

@Injectable()
export class RabbitmqService {
  private user = process.env.RABBITMQ_USER;
  private pass = process.env.RABBITMQ_PASSWORD;
  private host = process.env.RABBITMQ_HOST;
  private port = process.env.RABBITMQ_PORT;
  private queue = process.env.RABBITMQ_QUEUE;

  private url = `amqp://${this.user}:${this.pass}@${this.host}:${this.port}`;
  private client : ClientProxy;
    constructor() {
      this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
          urls: [this.url],
          queue: this.queue,
          queueOptions: {
              durable: true
          },

      },
  });
  }

  async uploadFile(file: FileUploadRequest): Promise<FileUploadResponse> {
    try {
      const response = await firstValueFrom(this.client.send(this.queue, file));
      return response;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }
}
