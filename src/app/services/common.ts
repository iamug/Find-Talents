import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASEURL,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
  mode: "cors",
});
