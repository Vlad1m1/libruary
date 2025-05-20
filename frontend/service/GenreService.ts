import { AxiosResponse } from "axios";

import $api from "../http";

import { IGenre } from "@/types/api/IGenre";

export default class GenreService {
  static async get() {
    return $api.get("/genres") as Promise<AxiosResponse<IGenre[]>>;
  }
}
