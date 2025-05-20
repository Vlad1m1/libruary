import { AxiosResponse } from "axios";

import $api from "../http";

import { IBook } from "@/types/api/IBook";

export default class BookService {
  static async search(query: string) {
    return $api.get("/books/search?query=" + query) as Promise<
      AxiosResponse<IBook[]>
    >;
  }
}
