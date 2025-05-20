import { AxiosResponse } from "axios";

import $api from "../http";

import { ILanguage } from "@/types/api/ILanguage";

export default class LanguageService {
  static async get() {
    return $api.get("/languages") as Promise<AxiosResponse<ILanguage[]>>;
  }
}
