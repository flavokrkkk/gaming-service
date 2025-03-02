"use client";

import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { ChatFormSchema, TypeChatFormSchema } from "../schemes/chatFormShcema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, Input } from "@/shared";
import { Plus, Smile } from "lucide-react";

interface IChatInput {
  apiUrl: string;
  query: Record<string, unknown>;
  name: string;
  type: "conversation" | "channel";
}

const ChatInput: FC<IChatInput> = ({}) => {
  const form = useForm<TypeChatFormSchema>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSudmit = (values: TypeChatFormSchema) => {
    console.log(values);
  };

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
                    onClick={() => {}}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition-all rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-gray-mode-200" />
                  </button>
                  <Input
                    {...field}
                    placeholder="Message..."
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  />
                  <div className="absolute top-7 right-8">
                    <Smile className="text-zinc-600 dark:text-zinc-200" />
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
