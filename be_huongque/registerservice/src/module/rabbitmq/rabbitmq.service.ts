import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FileUploadRequest, FileUploadResponse } from './config/rabbitconfig';

@Injectable()
export class RabbitmqService {
  private user = process.env.RABBITMQ_USER || 'adminhuongque';
  private pass = process.env.RABBITMQ_PASSWORD || 'huongque';
  private host = process.env.RABBITMQ_HOST || 'rabbitmq';
  private port = process.env.RABBITMQ_PORT || 5672;
  private queue = process.env.RABBITMQ_QUEUE || 'file.upload';
  private queueResponse = process.env.RABBITMQ_QUEUE_RESPONSE || 'file.upload.response';
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
  async uploadFileResponse(file: FileUploadResponse): Promise<FileUploadResponse> {
    try {
      const response = await firstValueFrom(this.client.send(this.queueResponse, file));
      return response;
    } catch (error) {
      throw new Error('Failed to upload file response');  
    }
  }
}
