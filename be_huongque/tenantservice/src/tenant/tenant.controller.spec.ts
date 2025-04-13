import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

describe('TenantController', () => {
  let controller: TenantController;
  let service: TenantService;

  const mockTenantService = {
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Test Tenant', domain: 'test.com' }),
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 1, name: 'Test Tenant', domain: 'test.com' }]),
    findByDomain: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Test Tenant', domain: 'test.com' }),
    findById: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Test Tenant', domain: 'test.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: mockTenantService, // Proper mock implementation
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
    service = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call TenantService.create when create is called', async () => {
    const data = { name: 'Test Tenant', domain: 'test.com' };
    await controller.create(data);
    expect(service.create).toHaveBeenCalledWith(data);
  });

  it('should call TenantService.findAll when findAll is called', async () => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call TenantService.findByDomain when findByDomain is called', async () => {
    const domain = 'test.com';
    await controller.findByDomain(domain);
    expect(service.findByDomain).toHaveBeenCalledWith(domain);
  });

  it('should call TenantService.findById when findById is called', async () => {
    const id = '1';
    await controller.findById(id);
    expect(service.findById).toHaveBeenCalledWith(id);
  });
});
