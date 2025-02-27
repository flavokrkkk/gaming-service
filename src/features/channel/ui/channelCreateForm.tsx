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
import { FC } from "react";
import { TypeCreateChannelFormSchema } from "../schemes/createChannelSchema";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { channelTypes } from "../libs/channelTypes";

interface IServerCustomizeForm {
  isPending: boolean;
  form: UseFormReturn<
    {
      name: string;
      type: ChannelType;
    },
    undefined,
    undefined
  >;
  onMutate: (values: TypeCreateChannelFormSchema) => void;
  onEvent?: () => void;
}

const ChannelCreateForm: FC<IServerCustomizeForm> = ({
  isPending,
  form,
  onEvent = () => {},
  onMutate,
}) => {
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: TypeCreateChannelFormSchema) => {
    onMutate(values);
    form.reset();
    onEvent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 px-6">
          <FormField
            disabled={isPending}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300/50">
                  Channel name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                    placeholder="Enter channel name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-300/50">
                  Channel Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-zinc-300/50 border-0 focus:right-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                      <SelectValue placeholder="Select a channel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {channelTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="capitalize"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="px-6 py-4">
          <Button disabled={isPending} variant={"indigo"} className="w-full">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChannelCreateForm;
