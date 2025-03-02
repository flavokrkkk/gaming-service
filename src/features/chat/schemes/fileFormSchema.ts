import * as z from "zod";

export const FileFormSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required!",
  }),
});

export type TypeFileFormSchema = z.infer<typeof FileFormSchema>;
