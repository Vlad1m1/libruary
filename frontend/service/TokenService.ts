import axios from "axios";

import { API_URL } from "@/http";

export default class TokenService {
  static async refresh() {
    const token = localStorage.getItem("refresh_token");

    if (!token) return;
    const headers = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const answer = axios.post(`${API_URL}/auth/refresh`, {}, headers);

    answer.then((response) => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
    });

    answer.catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");

        location.reload();

        return;
      }
    });
  }
}
