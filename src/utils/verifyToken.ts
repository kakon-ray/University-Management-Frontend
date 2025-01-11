import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};
