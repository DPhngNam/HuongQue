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
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create registration");
  }
  return res.json();
}

export async function getRegistrationsByUser(email: string) {
  const res = await fetch(API_BASE + `/all/user?email=${email}&page=1&limit=10`);
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch registrations");
  }
  return res.json();
}

export async function getRegistrationById(id: string) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch registration");
  }
  return res.json();
}