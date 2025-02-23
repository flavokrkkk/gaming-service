import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServerSliceState, ModalType } from "../types/types";
import { rootReducer } from "@/shared/store";

const initialState: IServerSliceState = {
  isOpen: false,
  type: null,
};

export const serverSlice = createSlice({
  name: "server-slice",
  initialState,
  selectors: {
    isOpen: (state) => state.isOpen,
    type: (state) => state.type,
  },
  reducers: (create) => ({
    setIsOpen: create.reducer(
      (state, { payload }: PayloadAction<ModalType>) => {
        state.isOpen = true;
        state.type = payload;
      }
    ),
    setClose: create.reducer((state) => {
      state.isOpen = false;
      state.type = null;
    }),
  }),
}).injectInto(rootReducer);

export const serverActions = serverSlice.actions;
export const serverSelectors = serverSlice.selectors;
