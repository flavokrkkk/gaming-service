export type ModalType = "createServer";

export interface IServerSliceState {
  type: ModalType | null;
  isOpen: boolean;
}
