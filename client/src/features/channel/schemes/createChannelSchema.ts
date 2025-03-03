import { ChannelType } from "@prisma/client";
import * as z from "zod";

export const CreateChannelFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required!",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be general",
    }),
  type: z.nativeEnum(ChannelType),
  isPrivate: z.boolean(),
});

export type TypeCreateChannelFormSchema = z.infer<
  typeof CreateChannelFormSchema
>;
