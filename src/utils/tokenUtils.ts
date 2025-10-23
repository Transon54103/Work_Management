// Token utility functions
export const isTokenExpired = (expiration: string): boolean => {
  if (!expiration) return true;

  const expirationDate = new Date(expiration);
  const now = new Date();

  return now >= expirationDate;
};

export const getTokenTimeRemaining = (expiration: string): number => {
  if (!expiration) return 0;

  const expirationDate = new Date(expiration);
  const now = new Date();

  return Math.max(0, expirationDate.getTime() - now.getTime());
};

export const clearAuthData = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("user");
};

export const getStoredAuthData = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const expiration = localStorage.getItem("tokenExpiration");
  const user = localStorage.getItem("user");

  return {
    token,
    refreshToken,
    expiration,
    user: user ? JSON.parse(user) : null,
  };
};
