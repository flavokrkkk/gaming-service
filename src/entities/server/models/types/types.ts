import { IServer } from "../../types";

export type ModalType = "createServer" | "invite" | "editServer" | "members";

export interface IModalData {
  server: IServer;
}

export interface IServerSliceState {
  type: ModalType | null;
  isOpen: boolean;
  selectServers: IModalData | null;
}
