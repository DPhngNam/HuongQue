import axiosInstance from "@/lib/axiosInstance";

export interface RegistrationPayload {
  email: string;
  name: string;
  phone: string;
  shopName: string;
  address: string;
  avatar?: File;
  banner?: File;
  description: string;
  businessType: string;
  bankAccount: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    branch: string;
  };
  idCard?: File;
  businessLicense?: File;
  foodSafetyCertificate?: File;
}

const API_BASE = "registerservice/api/register";

export async function createRegistration(payload: RegistrationPayload) {
  // Create FormData for multipart/form-data
  const formData = new FormData();
  
  // Append basic fields
  formData.append('email', payload.email);
  formData.append('name', payload.name);
  formData.append('phone', payload.phone);
  formData.append('shopName', payload.shopName);
  formData.append('address', payload.address);
  formData.append('description', payload.description);
  formData.append('businessType', payload.businessType);
  
  // Append bank account fields
  formData.append('bankAccount.accountNumber', payload.bankAccount.accountNumber);
  formData.append('bankAccount.accountName', payload.bankAccount.accountName);
  formData.append('bankAccount.bankName', payload.bankAccount.bankName);
  formData.append('bankAccount.branch', payload.bankAccount.branch);
  
  // Append files
  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }
  if (payload.banner) {
    formData.append('banner', payload.banner);
  }
  if (payload.idCard) {
    formData.append('idCard', payload.idCard);
  }
  if (payload.businessLicense) {
    formData.append('businessLicense', payload.businessLicense);
  }
  if (payload.foodSafetyCertificate) {
    formData.append('foodSafetyCertificate', payload.foodSafetyCertificate);
  }
  
  const res = await axiosInstance.post(`${API_BASE}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  console.log(res);
  return res.data;
}

export async function getRegistrationsByUser() {
  const res = await axiosInstance.get(API_BASE + `/all/user`, {
    params: {page: 1, limit: 10 },
  });
  console.log(res);
  if (res.status !== 200) {
    throw new Error("Failed to fetch registrations");
  }
  return res.data;
}

export async function getRegistrationById(id: string) {
  const res = await axiosInstance.get(`${API_BASE}/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch registration");
  }
  return res.data;
}