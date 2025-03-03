import { useAppSelector } from "../hooks/useAppSelector";
import { serverSelectors } from "@/entities/server/models/store/serverSlice";
import { uniqueModal } from "../libs/utils/modalVariables";

const ModalProvider = () => {
  const type = useAppSelector(serverSelectors.type);

  if (!type) return null;

  return uniqueModal[type];
};

export default ModalProvider;
