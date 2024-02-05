import { jwtDecode } from 'jwt-decode';

export function checkTokenExp(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 - Date.now() > 0;
  } catch (error) {
    return false;
  }
}

export function parseTokenPayload(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return {};
  }
}
