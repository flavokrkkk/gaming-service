"use client";

import { UseFormReturn } from "react-hook-form";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from "@/shared/ui/switch/switch";
import { Lock, Unlock } from "lucide-react";

interface IServerCustomizeForm {
  form: UseFormReturn<
    {
      name: string;
      type: ChannelType;
      isPrivate: boolean;
    },
    undefined,
    undefined
  >;
  onMutate: (values: TypeCreateChannelFormSchema) => void;
  onEvent?: () => void;
}

const ChannelCreateForm: FC<IServerCustomizeForm> = ({
  form,
  onEvent = () => {},
  onMutate,
}) => {
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: TypeCreateChannelFormSchema) => {
    onMutate(values);
    onEvent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-8 px-6">
          <FormField
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
                    <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none">
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
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between bg-zinc-800/50 border border-zinc-700 rounded-md p-4">
                <div className="flex items-center gap-3">
                  {field.value ? (
                    <Lock className="h-5 w-5 text-red-500" />
                  ) : (
                    <Unlock className="h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <FormLabel className="text-sm font-semibold text-zinc-200">
                      Private Channel
                    </FormLabel>
                    <FormDescription className="text-xs text-zinc-400">
                      {field.value
                        ? "Only invited members can join"
                        : "Anyone can join this channel"}
                    </FormDescription>
                  </div>
                </div>
                <FormControl>
                  <Switch
                    disabled={isLoading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-zinc-600"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="px-6 py-4">
          <Button variant={"indigo"} className="w-full">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChannelCreateForm;
