import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.warn('invalid token', err);
    return null;
  }
};

export const expiredToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  const currentTime = Date.now() / 1000;
  // If exp is missing or not numeric consider token expired
  if (typeof decoded.exp !== 'number') return true;
  return decoded.exp < currentTime;
};
