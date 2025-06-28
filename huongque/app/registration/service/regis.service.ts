import axiosInstance from "@/lib/axiosInstance";

export interface RegistrationPayload {
  email: string;
  name: string;
  phone: string;
  shopName: string;
  address: string;
  avatar: string;
  banner: string;
  description: string;
  businessType: string;
  bankAccount: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    branch: string;
  };
  idCard: string;
  businessLicense: string;
  foodSafetyCertificate: string;
}

const API_BASE = "http://localhost:8080/registerservice/api/register";

export async function createRegistration(payload: RegistrationPayload) {
  const res = await axiosInstance.post(API_BASE, payload);
  if (res.status !== 201) {
    throw new Error("Failed to create registration");
  }
  return res.data;
}

export async function getRegistrationsByUser(email: string) {
  const res = await axiosInstance.get(API_BASE + `/all/user`, {
    params: { email, page: 1, limit: 10 },
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