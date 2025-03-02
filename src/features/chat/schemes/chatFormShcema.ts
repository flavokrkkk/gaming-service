import * as z from "zod";

export const ChatFormSchema = z.object({
  content: z.string().min(1),
});

export type TypeChatFormSchema = z.infer<typeof ChatFormSchema>;
