import axiosInstance from "@/lib/axiosInstance";

export interface Registration {
  registration_id: string;
  tenant_email: string;
  tenant_name: string;
  tenant_address: string;
  tenant_sdt: string;
  tenant_description: string;
  business_model: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  note?: string;
  tenant_logo?: string;
  tenant_banner?: string;
  cccd_image?: string;
  business_license_image?: string;
  food_safety_certificate_image?: string;
}

export interface RegistrationResponse {
  registrations: Registration[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const registrationService = {
  // Get all registrations with pagination
  async getRegistrations(page: number = 1, limit: number = 10): Promise<RegistrationResponse> {
    try {
      const response = await axiosInstance.get(`/registerservice/api/register/all`, {
        params: { page, limit }
      });
      
      // Map backend response to frontend expected format
      const backendData = response.data;
      return {
        registrations: backendData.data || [],
        totalCount: backendData.total || 0,
        currentPage: backendData.page || 1,
        totalPages: backendData.lastPage || 1
      };
    } catch (error) {
      console.error('Error fetching registrations:', error);
      // Return empty structure on error
      return {
        registrations: [],
        totalCount: 0,
        currentPage: 1,
        totalPages: 1
      };
    }
  },

  // Update registration status
  async updateRegistrationStatus(id: string, status: string): Promise<Registration> {
    try {
      const response = await axiosInstance.patch(`/registerservice/api/register/${id}`, {
        status
      });
      return response.data;
    } catch (error) {
      console.error('Error updating registration status:', error);
      throw error;
    }
  },

  // Delete registration
  async deleteRegistration(id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/registerservice/api/register/${id}`);
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  }
};
