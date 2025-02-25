import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalData, IServerSliceState, ModalType } from "../types/types";
import { rootReducer } from "@/shared/store";

const initialState: IServerSliceState = {
  isOpen: false,
  type: null,
  selectServers: null,
};

export const serverSlice = createSlice({
  name: "server-slice",
  initialState,
  selectors: {
    isOpen: (state) => state.isOpen,
    type: (state) => state.type,
    selectServers: (state) => state.selectServers,
  },
  reducers: (create) => ({
    setIsOpen: create.reducer(
      (
        state,
        {
          payload: { type, data },
        }: PayloadAction<{ type: ModalType; data?: IModalData }>
      ) => {
        state.isOpen = true;
        state.type = type;
        state.selectServers = data ?? null;
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
