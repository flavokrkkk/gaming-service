"use client";

import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { ChatFormSchema, TypeChatFormSchema } from "../schemes/chatFormShcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, Input } from "@/shared";
import { Plus } from "lucide-react";
import { useChatMessage } from "../hooks/useChatMessage";
import { useActions } from "@/shared/hooks/useActions";
import EmojiPicker from "@/features/emoji/ui/emojiPicker";

interface IChatInput {
  apiUrl: string;
  query: Record<string, unknown>;
  name: string;
  type: "conversation" | "channel";
}

const ChatInput: FC<IChatInput> = ({ type, apiUrl, name, query }) => {
  const { setIsOpen } = useActions();

  const form = useForm<TypeChatFormSchema>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const { handleSendMessage } = useChatMessage();

  const placeholderText =
    type === "conversation" ? `Message ${name}` : `Message #${name}`;

  const onSudmit = (values: TypeChatFormSchema) => {
    handleSendMessage({ query, requestBody: values });
    form.reset();
    form.setFocus("content");
  };

  const handleFilePinModal = () =>
    setIsOpen({ type: "messageFile", data: { apiUrl, query } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSudmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={handleFilePinModal}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition-all rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-gray-mode-200" />
                  </button>
                  <Input
                    {...field}
                    autoFocus
                    placeholder={placeholderText}
                    className="px-14  py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-500 dark:placeholder:text-zinc-500 placeholder:font-semibold placeholder:text-base !text-base"
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
