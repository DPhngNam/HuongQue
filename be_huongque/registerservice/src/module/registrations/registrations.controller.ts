import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';

@Controller('/registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService, private readonly rabbitmqService: RabbitmqService) { }

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image')) // "image" is the field name
  @ApiBody({
    description: 'Upload images and form data',
    schema: {
      type: 'object',
      properties: {
        useremail: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
        },
        store_name: {
          type: 'string',
          example: 'My Store Name',
        },
        image: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: ['useremail', 'store_name', 'image'],
    },
  })
  async create(
    @UploadedFiles() uploadedFiles: Array<Express.Multer.File>,
    @Body() createRegistrationDto: CreateRegistrationDto,
  ) {
    console.log(createRegistrationDto);
    console.log(uploadedFiles);
    let imageUrl: { url: string; name: string }[] = [];
    await Promise.all(uploadedFiles.map(async (file) => {
      const fileUpload = {
        fileName: file.originalname,
        fileContent: file.buffer.toString('base64'),
        bucketName: 'registrations',
        contentType: file.mimetype,
      }

      const response = await this.rabbitmqService.uploadFile(fileUpload);
      if (response.success) {
        imageUrl.push({
          url: response.message,
          name: file.originalname,
        });
      }
    }));
    createRegistrationDto.image = imageUrl;
    return this.registrationsService.create(createRegistrationDto);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
