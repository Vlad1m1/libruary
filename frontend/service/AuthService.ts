import $api from "../http";

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post("/auth/login", { email, password });
  }

  static async registration(email: string, password: string) {
    return $api.post("/user/register", { email, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
