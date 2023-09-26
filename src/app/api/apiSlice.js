import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://group-grocery-list.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // send base query to server
  let result = await baseQuery(args, api, extraOptions);
  console.log("BASE QUERY SET AGAIN!");
  console.log(result?.error?.status);

  // if access token in header is expired, try to get a new one with your refreshtoken that is in the cookie jwt
  if (result?.error?.status === 403) {
    // try to get a new access token passing in the refresh token in your cookies
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    // if refreshResult resived a non expired refreashtoken it will return a new access token
    if (refreshResult?.data) {
      // set the new access token to our state
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // now send the base query to the anitial url again
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (!refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired";
      }
      return refreshResult;
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Group", "Item"],
  endpoints: (build) => ({}),
});

export default apiSlice;
