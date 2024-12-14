// authUtils.js

export const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token'); // Get the token from storage
  const expirationTime = localStorage.getItem('auth_expiration'); // Get the expiration time from storage

  if (!token) {
    return false; // No token or expiration time, user is not authenticated
  }

  // Get the current time in milliseconds
  const currentTime = new Date().getTime();

  // If the current time is greater than the expiration time, the session has expired
  if (currentTime > expirationTime) {
    localStorage.removeItem('auth_token'); // Remove expired token
    localStorage.removeItem('auth_expiration'); // Remove expired expiration time
    return false;
  }

  return true; // Token is valid and not expired
};
