import { serverActions } from "@/entities/server/models/store/serverSlice";
import { socketActions } from "@/entities/socket/model/store/socketSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ ...serverActions, ...socketActions }, dispatch);
};
