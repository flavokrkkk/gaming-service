import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/store";
import { io, Socket } from "socket.io-client";
import { SocketState } from "../types/types";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const initialState: SocketState = {
  socket: null,
  isConnected: false,
  error: "",
};

export const socketSlice = createSliceWithThunks({
  name: "socketSlice",
  initialState,
  selectors: {
    isConnected: (state) => state.isConnected,
    socket: (state) => state.socket,
    error: (state) => state.error,
  },
  reducers: (create) => ({
    connectionSocket: create.asyncThunk<Socket, void, { rejectValue: string }>(
      async (_, { rejectWithValue }) => {
        try {
          const socket = io("http://localhost:3002", {
            transports: ["websocket"],
          });

          return socket;
        } catch (err) {
          return rejectWithValue(`${err}`);
        }
      },
      {
        pending: (state) => {
          state.isConnected = false;
          state.error = "";
        },
        fulfilled: (state, { payload }: PayloadAction<Socket>) => {
          return {
            ...state,
            socket: payload,
            isConnected: true,
          };
        },
        rejected: (state) => {
          state.error = "No connection";
          state.isConnected = false;
        },
      }
    ),
  }),
}).injectInto(rootReducer);

export const socketReducer = socketSlice.reducer;
export const socketActions = socketSlice.actions;
export const socketSelectors = socketSlice.selectors;
