import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { RegistrationsService } from './registrations.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api/register')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService, private readonly rabbitmqService: RabbitmqService) { }

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'idCard', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 },
    { name: 'foodSafetyCertificate', maxCount: 1 },
  ]))
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  async create(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
      idCard?: Express.Multer.File[];
      businessLicense?: Express.Multer.File[];
      foodSafetyCertificate?: Express.Multer.File[];
    },
    @Body() createRegistrationDto: CreateRegistrationDto,
  ) {
    console.log(createRegistrationDto);
    console.log(files);

    // Example of uploading files (e.g., avatar)
    const uploadResult = await Promise.all(Object.entries(files).map(async ([key, fileArr]) => {
      if (fileArr && fileArr[0]) {
        const file = fileArr[0];
        const response = await this.rabbitmqService.uploadFile({
          fileName: file.originalname,
          fileContent: file.buffer.toString('base64'),
          bucketName: 'registrations',
          contentType: file.mimetype,
        });

        if (response.success) {
          // Attach uploaded URL back to DTO
          (createRegistrationDto as any)[key] = response.message;
        }
      }
    }));

    return this.registrationsService.create(createRegistrationDto);
  }


  @Get('/all')
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.registrationsService.findAll(Number(page), Number(limit));
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const registration = await this.registrationsService.findOne(id);
    if (!registration) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    return registration;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    const updated = await this.registrationsService.update(id, updateRegistrationDto);
    if (!updated) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.registrationsService.remove(id);
    if (!result) {
      throw new NotFoundException(`Registration with ID ${id} not found`);
    }
    return { message: `Registration with ID ${id} deleted successfully` };
  }
}
