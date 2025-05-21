import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { PORT, HOST } from "../config";

import { SECURE } from "@/config";
import { ILanguage } from "@/types/api/ILanguage";
import AuthService from "@/service/AuthService";
import { ITokens } from "@/types/ITokens";

export const API_URL = `${SECURE ? "https" : "http"}://${HOST}:${PORT}`;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithoutHeader = fetchBaseQuery({
  baseUrl: API_URL,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      AuthService.logout();

      return result;
    }

    const refreshResult = await baseQueryWithoutHeader(
      {
        url: "/auth/refresh",
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions,
    );

    const data = refreshResult.data as ITokens;

    if (data) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      AuthService.logout();
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getLanguages: builder.mutation<ILanguage[], null>({
      query: (credentials) => ({
        url: "/languages",
        method: "GET",
      }),
    }),
    updateLanguage: builder.mutation<
      ILanguage,
      Pick<ILanguage, "value" | "code" | "id">
    >({
      query: (credentials) => ({
        url: "/languages/" + credentials.id,
        method: "PUT",
        body: credentials,
      }),
    }),
    createLanguage: builder.mutation<
      ILanguage,
      Pick<ILanguage, "value" | "code">
    >({
      query: (credentials) => ({
        url: "/languages",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteLanguage: builder.mutation<null, { id: string }>({
      query: (credentials) => ({
        url: "/languages/" + credentials.id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetLanguagesMutation,
  useUpdateLanguageMutation,
  useCreateLanguageMutation,
  useDeleteLanguageMutation,
} = api;
