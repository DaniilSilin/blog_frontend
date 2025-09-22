import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Register, Login } from "@/app/types";

const BASE_URL = "http://127.0.0.1:8000/";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<Register, undefined>({
      query: (register) => ({
        url: "/register",
        method: "POST",
        body: register,
      }),
    }),
    loginUser: builder.mutation<Login, string>({
      query: (login) => ({
        url: "/login",
        method: "POST",
        body: login,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        body: undefined,
      }),
    }),
  }),
});

export const {
  // @ts-ignore
  useRegisterUserMutation,
  // @ts-ignore
  useLoginUserMutation,
  // @ts-ignore
  useLogoutUserMutation,
} = userAPI;
