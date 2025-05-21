import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileUploadRequest } from './config/rabbitconfig';
import { RabbitmqService } from './rabbitmq.service';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern('file.upload')
  async uploadFile(@Payload() file: FileUploadRequest) {
    return this.rabbitmqService.uploadFile(file);
  }
}
