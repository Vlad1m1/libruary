import { AxiosResponse } from "axios";

import { IUserAuth } from "@/types/IUserAuth";
import AuthService from "@/service/AuthService";
import { store } from "@/store";
import { AuthSlice } from "@/store/reducers/AuthSlice";

export default class AuthModel {
  static async login(login: string, password: string) {
    const response: AxiosResponse<IUserAuth> = await AuthService.login(
      login,
      password,
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    store.dispatch(AuthSlice.actions.change(true));

    return response;
  }

  static async registration(login: string, password: string) {
    const response: AxiosResponse<IUserAuth> = await AuthService.registration(
      login,
      password,
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    store.dispatch(AuthSlice.actions.change(true));

    return response;
  }

  static async logout() {
    const res = AuthService.logout();

    store.dispatch(AuthSlice.actions.change(false));
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    return res;
  }
}
