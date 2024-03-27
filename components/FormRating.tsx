"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as z from "zod";

import prisma from "../db";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import toast, { Toaster } from "react-hot-toast";

const AddProductsForm = () => {
  const Router = useRouter();
  const formValidateComment = z.object({
    comment: z
      .string({
        required_error: "votre commentaire est vide",
      })

      .trim(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formValidateComment>>({
    resolver: zodResolver(formValidateComment),
    defaultValues: {
      comment: undefined,
    },
  });
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }
   function onSubmit(values: z.infer<typeof formValidateComment>) {
    console.log(values)
  }

  const classLabel = `text-gray-500 absolute
  cursor-text
  text-md
  duration-150
  transform
  -translate-y-3
  top-5
  z-10
  origin[0]
  left-4
  peer-placeholder-shown:scale-100peer-placeholder-shown:translate-y-0
  peer-focus:scale-75
  peer-focus:-translate-y-4`;
  const classInput = `h-5 peer font-light rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 border  p-8 pt-10`;
  return (
    <div className="flex justify-center items-center  w-full">
      <div className="flex flex-col px-4 py-4 w-[300px] sm:w-[600px]">
        <Toaster />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl id="comment" className={`${classInput}`}>
                      <Input
                        className="peer"
                        id="comment"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel htmlFor="name" className={`${classLabel}`}>
                      Votre commentaire
                    </FormLabel>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {isLoading ? (
              <div>
                <Button
                  disabled
                  type="submit"
                  className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                >
                  <Loader2 className="text-white animate-spin" />
                  Commenter
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type="submit"
                  className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                >
                  Commenter
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddProductsForm;
