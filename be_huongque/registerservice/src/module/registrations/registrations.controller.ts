import { Body, Controller, Headers, Delete, Get, NotFoundException, Param, Patch, Post, Query, UploadedFiles, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
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

    // Map frontend business type values to backend enum values (Vietnamese values)
    const businessTypeMapping = {
      'retail': 'Cá nhân',        // Bán lẻ → Cá nhân
      'wholesale': 'Công ty',     // Bán sỉ → Công ty
      'both': 'Công ty',          // Bán lẻ và bán sỉ → Công ty
      'service': 'Cá nhân',       // Dịch vụ → Cá nhân
    };

    const frontendBusinessType = (createRegistrationDto as any).businessType;
    const mappedBusinessType = businessTypeMapping[frontendBusinessType] || 'Khác';

    // Map frontend field names to entity field names
    const mappedDto = {
      tenant_email: (createRegistrationDto as any).email,
      tenant_name: (createRegistrationDto as any).shopName || (createRegistrationDto as any).name,
      tenant_address: (createRegistrationDto as any).address,
      tenant_sdt: (createRegistrationDto as any).phone,
      tenant_description: (createRegistrationDto as any).description,
      business_model: mappedBusinessType,
      // Parse bank account - check if it's nested object or flattened
      bankAccount: (createRegistrationDto as any).bankAccount || {
        accountNumber: (createRegistrationDto as any)['bankAccount.accountNumber'],
        accountName: (createRegistrationDto as any)['bankAccount.accountName'],
        bankName: (createRegistrationDto as any)['bankAccount.bankName'],
        branch: (createRegistrationDto as any)['bankAccount.branch'],
      }
    };

    // Upload files first and wait for completion
    const uploadPromises = Object.entries(files).map(async ([key, fileArr]) => {
      if (fileArr && fileArr[0]) {
        const file = fileArr[0];
        try {
          // Sanitize filename - remove spaces and special characters
          const sanitizedFileName = file.originalname
            .replace(/\s+/g, '_')  // Replace spaces with underscores
            .replace(/[^a-zA-Z0-9._-]/g, '') // Remove special characters except dots, underscores, hyphens
            .toLowerCase(); // Convert to lowercase
          
          // Add timestamp to make filename unique
          const timestamp = Date.now();
          const finalFileName = `${timestamp}_${sanitizedFileName}`;

          const response = await this.rabbitmqService.uploadFile({
            fileName: finalFileName,
            fileContent: file.buffer.toString('base64'),
            bucketName: 'registrations',
            contentType: file.mimetype,
          });

          if (response.success) {
            // Map file URLs to entity field names
            switch (key) {
              case 'idCard':
                (mappedDto as any).cccd_image = response.message;
                break;
              case 'businessLicense':
                (mappedDto as any).business_license_image = response.message;
                break;
              case 'foodSafetyCertificate':
                (mappedDto as any).food_safety_certificate_image = response.message;
                break;
              case 'avatar':
                (mappedDto as any).tenant_logo = response.message;
                break;
              case 'banner':
                (mappedDto as any).tenant_banner = response.message;
                break;
            }
            console.log(`Successfully uploaded ${key} as ${finalFileName}:`, response.message);
          } else {
            console.error(`Failed to upload ${key}:`, response);
          }
        } catch (error) {
          console.error(`Error uploading ${key}:`, error);
        }
      }
    });

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      await this.registrationsService.create(mappedDto as any);

      return { 
        message: 'Registration created successfully',
        statusCode: HttpStatus.CREATED 
      };
    } catch (error) {
      console.error('Error creating registration:', error);
      throw new HttpException(
        'Failed to create registration. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Get('/all')
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.registrationsService.findAll(Number(page), Number(limit));
  }
  @Get('/all/user')
  async findOne(@Headers('X-User-Id') userId: string,@Param('userEmail') userEmail: string) {
    const registration = await this.registrationsService.findOne(userEmail);
    if (!registration) {
      throw new NotFoundException(`Registration with ID ${userId} not found`);
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
