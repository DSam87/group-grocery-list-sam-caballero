import apiSlice from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const itemAdapter = createEntityAdapter({});
const initialState = itemAdapter.getInitialState();

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/items",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      transformResponse: (response, meta, arg) => {
        const loadedItems = response.map((item) => {
          item.id = item._id;
          return item;
        });
        return itemAdapter.setAll(initialState, loadedItems);
      },
      providesTags: (result, error, arg) => {
        if (arg?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...arg.ids.map((id) => ({ type: "Item", id: id })),
          ];
        } else {
          return [{ type: "Item", id: "LIST" }];
        }
      },
    }),
    addNewItem: builder.mutation({
      query: (initialItemData) => ({
        url: "/items",
        method: "POST",
        body: { ...initialItemData },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Item", id: arg.id }];
      },
    }),
  }),
});

export const { useGetItemsQuery, useAddNewItemMutation } = itemsApiSlice;

const selectItemResult = itemsApiSlice.endpoints.getItems.select();

const selectItemsData = createSelector(
  selectItemResult,
  (itemResult) => itemResult.data
);

export const {
  selectById: selectItemById,
  selectAll: selectAllItems,
  selectIds: selectItemIds,
  selectEntities: selectItemEntities,
} = itemAdapter.getSelectors((state) => selectItemsData(state) ?? initialState);
