import axios from "axios";

import { SECURE, PORT, HOST } from "../config";
import AuthModel from "../model/AuthModel";

import { store } from "@/store";
import { AuthSlice } from "@/store/reducers/AuthSlice";

export const API_URL = `${SECURE ? "https" : "http"}://${HOST}:${PORT}`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer: ${localStorage.getItem("token")}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        if (!localStorage.getItem("refresh_token"))
          throw new Error(`token isn't exist`);
        const headers = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("refresh_token")}`,
          },
        };

        const response = await axios.post(
          `${API_URL}/user/refresh`,
          {},
          headers,
        );

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        return $api.request(originalRequest);
      } catch (e) {
        console.warn(e, "НЕ АВТОРИЗОВАН. Ошибка:", e);
        store.dispatch(AuthSlice.actions.change(false));
        AuthModel.logout().then(() => {
          //@ts-ignore
          //location.reload();
        });
      }
    }
    throw error;
  },
);

export default $api;
