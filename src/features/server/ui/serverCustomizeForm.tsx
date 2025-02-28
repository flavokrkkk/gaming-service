"use client";

import { UseFormReturn } from "react-hook-form";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared";
import { TypeCustomizeFormSchema } from "../schemes";
import FileUpload from "@/features/files/ui/fileUpload";
import { FC } from "react";

interface IServerCustomizeForm {
  form: UseFormReturn<
    {
      name: string;
      imageUrl: string;
    },
    undefined,
    undefined
  >;
  type: "create" | "update";
  onMutate: (values: TypeCustomizeFormSchema) => void;
  onEvent?: () => void;
}

const ServerCustomizeForm: FC<IServerCustomizeForm> = ({
  form,
  type = "create",
  onEvent = () => {},
  onMutate,
}) => {
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: TypeCustomizeFormSchema) => {
    onMutate(values);
    onEvent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 px-6">
          <div className="flex items-center justify-center text-center font-medium">
            TODO: Image Upload
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    endpoint="serverImage"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300/50">
                  Server name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                    placeholder="Enter Server name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="px-6 py-4">
          <Button variant={"indigo"} className="w-full">
            {type === "create" ? "Create" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServerCustomizeForm;
