export const getUserIdLocalStorage = (): string | null => {
    return localStorage.getItem("userId");
  };
  
  export const setUserIdLocalStorage = (userId: string): void => {
    localStorage.setItem("userId", userId);
  };