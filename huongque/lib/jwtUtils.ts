import { jwtDecode } from "jwt-decode";

export function getAllClaimsFromToken<T = any>(token: string): T | null {
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}

export function getRolesFromToken(token: string): string[] {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.roles || [];
  } catch {
    return [];
  }
}
