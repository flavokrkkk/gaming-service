import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "@/shared";

import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { TypeChatFormSchema } from "../schemes/chatFormShcema";

interface IChatMessageForm {
  isPending: boolean;
  form: UseFormReturn<
    {
      content: string;
    },
    unknown,
    undefined
  >;
  onSubmit: (values: TypeChatFormSchema) => void;
}

const ChatMessageForm: FC<IChatMessageForm> = ({
  isPending,
  form,
  onSubmit,
}) => (
  <Form {...form}>
    <form
      className="flex items-center w-full gap-x-2 pt-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="relative w-full">
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Edited message"
                  className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      <Button disabled={isPending} size={"sm"} variant={"indigo"}>
        Save
      </Button>
    </form>
    <span className="text-[10px] mt-1 text-zinc-400 ">
      Press escape to cancel, enter to save
    </span>
  </Form>
);

export default ChatMessageForm;
