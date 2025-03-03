import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalData, IServerSliceState, ModalType } from "../types/types";
import { rootReducer } from "@/shared/store";
import { ChannelType } from "@prisma/client";

const initialState: IServerSliceState = {
  isOpen: false,
  type: null,
  selectServers: null,
  selectChannelType: ChannelType.TEXT,
};

export const serverSlice = createSlice({
  name: "server-slice",
  initialState,
  selectors: {
    isOpen: (state) => state.isOpen,
    type: (state) => state.type,
    selectServers: (state) => state.selectServers,
    selectChannelType: (state) => state.selectChannelType,
  },
  reducers: (create) => ({
    setIsOpen: create.reducer(
      (
        state,
        {
          payload: { type, data },
        }: PayloadAction<{ type: ModalType; data?: IModalData }>
      ) => {
        if (data?.channelType) {
          state.selectChannelType = data.channelType;
        }

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
