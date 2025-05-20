import { AxiosResponse } from "axios";

import $api from "../http";

import { IAuthor } from "@/types/api/IAuthor";

export default class AuthorService {
  static async search(query: string) {
    return $api.get("/authors/search?query=" + query) as Promise<
      AxiosResponse<IAuthor[]>
    >;
  }
}
