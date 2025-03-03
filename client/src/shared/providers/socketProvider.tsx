import { PropsWithChildren } from "react";
import { useSocketConnect } from "../hooks/useSocketConnect";

const SocketProvider = ({ children }: PropsWithChildren) => {
  useSocketConnect();

  return children;
};

export default SocketProvider;
