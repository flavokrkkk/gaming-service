"use client";

import { UseFormReturn } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem } from "@/shared";
import FileUpload from "@/features/files/ui/fileUpload";
import { FC } from "react";
import { TypeFileFormSchema } from "../schemes/fileFormSchema";

interface IServerCustomizeForm {
  form: UseFormReturn<
    {
      fileUrl: string;
    },
    undefined,
    undefined
  >;
  onMutate: (values: TypeFileFormSchema) => void;
  onEvent?: () => void;
}

const ChatMessageFileForm: FC<IServerCustomizeForm> = ({
  form,
  onEvent = () => {},
  onMutate,
}) => {
  const onSubmit = async (values: TypeFileFormSchema) => {
    onMutate(values);
    onEvent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 px-6">
          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    endpoint="messageFile"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-6 py-2">
          <Button variant={"indigo"} className="w-full">
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChatMessageFileForm;
