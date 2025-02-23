import { serverActions } from "@/entities/server/models/store/serverSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators({ ...serverActions }, dispatch);
};
