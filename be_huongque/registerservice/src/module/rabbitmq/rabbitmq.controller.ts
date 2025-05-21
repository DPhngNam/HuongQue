import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { CreateRabbitmqDto } from './dto/create-rabbitmq.dto';
import { UpdateRabbitmqDto } from './dto/update-rabbitmq.dto';
import { FileUploadRequest } from './config/rabbitconfig';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern('file.upload')
  async uploadFile(@Payload() file: FileUploadRequest) {
    return this.rabbitmqService.uploadFile(file);
  }
}
