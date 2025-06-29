import { jwtDecode } from "jwt-decode";

export function getUserEmail() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.email;
  } catch {
    return null;
  }
}
