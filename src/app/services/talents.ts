import { createApi } from "@reduxjs/toolkit/query/react";
import { IApiResponse } from "../../interfaces/common";
import { ITalent } from "../../interfaces/talents";
import { baseQuery } from "./common";

interface SearchParams {
  job_title: string;
  city: string;
  country: string;
}

interface PaginationParams {
  page: number;
  limit: number;
  next: string;
}

export const talentsApi = createApi({
  reducerPath: "talents",
  baseQuery: baseQuery,
  tagTypes: ["Talents", "SearchTalents"],
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTalents: builder.query<IApiResponse<ITalent[]>, { pagination: Partial<PaginationParams> }>({
      query: ({ pagination: { page = 1, limit = 10 } }) => `/talents?page=${page}&limit=${limit}`,
      providesTags: (result, error, arg) => [{ type: "Talents", id: `${arg.pagination.page}-${arg.pagination.limit}` }],
    }),
    getTalentsByNext: builder.query<IApiResponse<ITalent[]>, { pagination: Pick<PaginationParams, "next" | "limit"> }>({
      query: ({ pagination: { limit = 10, next } }) => `/talents?next=${next}&limit=${limit}`,
      providesTags: (result, error, arg) => [{ type: "Talents", id: `${arg.pagination.next}-${arg.pagination.limit}` }],
    }),
    searchTalents: builder.query<IApiResponse<ITalent[]>, { search?: Partial<SearchParams> }>({
      query: ({ search }) =>
        `/talents?page=${1}&${search?.job_title ? `&job_title=${search.job_title.trim()}` : ""}${
          search?.city ? "&city=" + search.city.trim() : ""
        }${search?.country ? "&country=" + search.country.trim() : ""}`,
      providesTags: (result, error, arg) => [{ type: "SearchTalents", id: `${arg.search}` }],
    }),
  }),
});

export const { useGetTalentsQuery, useGetTalentsByNextQuery, useSearchTalentsQuery } = talentsApi;
