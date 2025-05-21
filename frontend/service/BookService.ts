import { AxiosResponse } from "axios";

import $api from "../http";

import { buildGetOptions } from "@/utils/buildGetOptions";
import { IBook } from "@/types/api/IBook";

interface BookSearchOptions {
  years?: number[];
  authorIds?: string[];
  langIds?: string[];
  genreIds?: string[];
  query: string;
}

export default class BookService {
  static async search(options: BookSearchOptions) {
    return $api.get("/books/search?" + buildGetOptions(options)) as Promise<
      AxiosResponse<IBook[]>
    >;
  }
}
