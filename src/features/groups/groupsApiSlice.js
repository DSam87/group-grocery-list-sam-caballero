import apiSlice from "../../app/api/apiSlice";

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// Create memorized selector with initila state
// has built in methods aswell
const groupsAdapter = createEntityAdapter({});

// Get initalState from groupsAdapter method
const initialState = groupsAdapter.getInitialState();

// create groupsApiSlice by selecting the apiSlice and injecting endpoints
export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "/family-group",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        const loadedGroups = responseData.map((group) => {
          group.id = group._id;
          return group;
        });
        return groupsAdapter.setAll(initialState, loadedGroups);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Group", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Group", id })),
          ];
        } else return [{ type: "Group", id: "LIST" }];
      },
    }),
    addNewGroup: builder.mutation({
      query: (initialGroupData) => ({
        url: "/family-group",
        method: "POST",
        body: { ...initialGroupData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Group", id: "LIST" }],
    }),
    updateGroup: builder.mutation({
      query: (initialGroupData) => ({
        url: "/family-group",
        method: "PATCH",
        body: { ...initialGroupData, isSignup: true },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Group", id: arg.id }],
    }),
    deleteGroup: builder.mutation({
      query: ({ id }) => ({
        url: "/family-group",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Group", id: arg.id }],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useAddNewGroupMutation,
} = groupsApiSlice;

// every run, creates a new memorized selector function.
// return the query result object for a query with those parameters.
export const selectGroupsResult = groupsApiSlice.endpoints.getGroups.select();

// creates memoized selector
export const selectGroupsData = createSelector(
  selectGroupsResult,
  (groupsResult) => {
    return groupsResult.data;
  }
);

export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectGroupIds,
} = groupsAdapter.getSelectors(
  (state) => selectGroupsData(state) ?? initialState
);
