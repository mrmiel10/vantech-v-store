"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

const formValidateOrder = z.object({
  email: z
    .string({
      required_error: "veuiller entrer une adrese mail",
    })
    .email({
      message: "email invalide",
    })
    .trim()
    .min(1, { message: "entrer une adresse email" }),
  cardName: z
    .string({
      required_error: "veuiller entrer le nom de la carte",
    })
    .trim()
    .min(1, { message: "veuiller entrer le nom de la carte" }),
  dateExpires: z.string(z.coerce.date()),
  CVC: z.string({ required_error: "veuiller entrer le CVC" }),
  address: z.string({ required_error: "veuiller entrer une adresse" }),

  bill: z.optional(z.boolean().default(false)),
});
export type defineUser = z.infer<typeof formValidateOrder>;

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof formValidateOrder>>({
    resolver: zodResolver(formValidateOrder),
    defaultValues: {
      bill: true,
    },
  });
  function onSubmit(values: z.infer<typeof formValidateOrder>) {
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center  w-full">
      <div className="flex flex-col px-4 py-4 w-[300px] sm:w-[500px]">
        <p className="text-center text-blue-700 mb-2 font-bold">
          Entrer vos informations pour finaliser le payement
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-500">Adresse mail</FormLabel>
                  <FormControl className="rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border">
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-500">
                    Nom de la carte
                  </FormLabel>
                  <FormControl className="rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border">
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-between gap-x-2 w-full ">
              <FormField
                control={form.control}
                name="dateExpires"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-[70%]">
                    <FormLabel className="text-gray-500">
                      Date d&apos;expiration(MM/YY)
                    </FormLabel>
                    <FormControl className="rounded-md border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="CVC"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end w-[30%]">
                    <FormLabel className="text-gray-500">CVC</FormLabel>
                    <FormControl className=" border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border">
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-500">Adresse</FormLabel>
                  <FormControl className=" border-gray-400  outline-none focus:ring-2  ring-offset-2 ring-blue-700 px-4 py-2 border">
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bill"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-0 ">
                  <div className="flex flex-row space-x-1 mb-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-blue-700"
                      />
                    </FormControl>
                    <FormLabel className="text-gray-500">
                      Billing address is the same as shipping
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {/* <Button className="bg-black">Soumettre</Button> */}
            {/* <div className="flex justify-center">
                 
                  {isSubmitting? (
                   <Button disabled   className="bg-black"
                   ><Loader2 className="text-blue-500 animate-spin" /></Button>
                )
                :
                (
                  <Button className="bg-black">Soumettre</Button>
                )
                }               

                </div> */}
            <div>
              <p className="text-center font-bold text-orange-500">
                Total: FCFA 10000
              </p>
              <Button
                type="submit"
                className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Payer
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CheckoutForm;
