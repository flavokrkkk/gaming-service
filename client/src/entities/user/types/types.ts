import { IServer } from "@/entities/server/types/types";

export interface ICurrentUser {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  servers?: Array<IServer>;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
