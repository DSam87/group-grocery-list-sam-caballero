import apiSlice from "../../app/api/apiSlice";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { useLoginMutation } from "../auth/authApiSlice";

// Create memorized selector with initila state (set up normalized data for our state cach)
// has built in methods aswell
const usersAdapter = createEntityAdapter({});

// Get initalState from usersAdapter method
const initialState = usersAdapter.getInitialState();

// create usersApiSlice by selecting the apiSlice and injecting endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: { ...initialUserData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...initialUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "DELETE",
        body: { ...initialUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  usePublicAddNewUserMutation,
} = usersApiSlice;

// every run, creates a new memorized selector function.
// return the query result object for a query with those parameters.
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => {
    return usersResult.data;
  }
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
