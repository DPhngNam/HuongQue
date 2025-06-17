import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegistrationStatus } from '../dto/create-registration.dto';
import { BusinessModel } from './business-model.enum';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Registration ID', example: 'uuid-string' })
  registration_id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  tenant_email!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    description: 'Name of the store',
    example: 'My Store Name',
  })
  tenant_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    description: 'Physical address of the store',
    example: '123 Store Street, City, Country',
  })
  tenant_address!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  @ApiProperty({
    description: 'Store contact phone number',
    example: '+84123456789',
  })
  tenant_sdt!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'Optional note', required: false })
  note?: string;

  @Column({ type: 'enum', enum: RegistrationStatus, default: RegistrationStatus.PENDING })
  @ApiProperty({ description: 'Registration status', enum: RegistrationStatus })
  status: RegistrationStatus = RegistrationStatus.PENDING;

  @CreateDateColumn()
  @ApiProperty({ description: 'Creation date', type: Date })
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Update date', type: Date })
  updatedAt!: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ApiProperty({ description: 'Store description', required: false })
  tenant_description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'Store logo URL', required: false })
  tenant_logo?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'Store banner URL', required: false })
  tenant_banner?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({ description: 'Citizen ID image URL (CCCD)' })
  cccd_image!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({ description: 'Business license image URL' })
  business_license_image!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({ description: 'Food safety certificate image URL' })
  food_safety_certificate_image!: string;

  @Column({ type: 'enum', enum: BusinessModel, nullable: false })
  @ApiProperty({ description: 'Business model', enum: BusinessModel })
  business_model!: BusinessModel;
}
