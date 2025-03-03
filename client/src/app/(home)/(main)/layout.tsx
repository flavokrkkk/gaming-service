import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
  return <div className="h-full">{children}</div>;
};

export default MainLayout;
