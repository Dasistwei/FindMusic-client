const JWT_TOKEN = "jwt_token";

const LocalStorage = {
  // 將 token 存到 localStorage
  setAuthToken: (token) => {
    localStorage.setItem(JWT_TOKEN, token);
  },
  // 從 localStorage 讀取 token
  getAuthToken: () => {
    return localStorage.getItem(JWT_TOKEN);
  }
}
export { LocalStorage }