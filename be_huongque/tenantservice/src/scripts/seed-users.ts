import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeederService {
  constructor(private readonly http: HttpService) {}

  async seedUsersFromTenants() {
    const tenants = await this.tenantRepository.find(); // lấy toàn bộ tenant

    for (const tenant of tenants) {
      const userPayload = {
        id: tenant.owner, // UUID
        email: `${tenant.phone}@seed.huongque.vn`, // tạo email giả định nếu không có
        phone: tenant.phone,
        fullName: tenant.name,
        avatar: tenant.avatar
      };

      // Gửi sang AuthService
      try {
        await firstValueFrom(
          this.http.post('http://auth-service/internal/users', userPayload),
        );
      } catch (err) {
        console.error(`Failed to sync auth for ${tenant.name}:`, err.message);
      }

      // Gửi sang UserService
      try {
        await firstValueFrom(
          this.http.post('http://user-service/internal/user-profile', userPayload),
        );
      } catch (err) {
        console.error(`Failed to sync profile for ${tenant.name}:`, err.message);
      }
    }
  }
}
