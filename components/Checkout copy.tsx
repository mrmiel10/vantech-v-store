"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import nikeShoe from "../public/blackNike.jpg";
import redShoe from "../public/redShoe.jpg";
import logoTailwind from "../public/tailwind.png";
import { Plus } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { AppleIcon } from "lucide-react";
const formValidateOrder = z.object({
  email: z
    .string({
      required_error: "veuiller entrer une adrese mail",
    })
    .email({
      message: "email invalide",
    }).trim().min(1,{message:"entrer une adresse email"}),
  cardName: z
    .string({
      required_error: "veuiller entrer le nom de la carte",
    }).trim().min(1,{message:"veuiller entrer le nom de la carte"}),
    dateExpires: z.string(z.coerce.date()),
    CVC:z.string({required_error:"veuiller entrer le CVC"}),
    address:z.string({required_error:"veuiller entrer une adresse"}),
    
  bill: z.optional(z.boolean().default(false)),
});
export type defineUser = z.infer<typeof formValidateOrder>


const CheckoutForm = () => {
  const form = useForm<z.infer<typeof formValidateOrder>>({
    resolver: zodResolver(formValidateOrder),
    defaultValues: {
      //username: "",
      bill: true,
    },
   
  })
  function onSubmit(values: z.infer<typeof formValidateOrder>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div></div>
      <div className="grow flex flex-col f1000:flex-row">
        <div className="f1000:w-[40%] w-full px-4 py-8 max-w-[600px] mx-auto">
          <div className="flex justify-between mb-10 f1000:hidden items-center">
            <p>Your Order</p>            
              <span className="text-blue-600 toggle-section-articles"> Hide full Summary</span>
                    
           
          </div>
          <div className="divide-y-2 divide-gray-200 section-articles flex flex-col">
            <div className="div-articles flex gap-x-4 py-4">
              <div className="flex basis-[50%] h-[150px] f600:h-[200px] img-article bg-white">
                <Image
                  className="rounded-lg w-full object-cover"
                  src={redShoe}
                  alt="redShoe"
                />
              </div>
              <div className="detail-article basis-[50%] flex flex-col justify-between">
                <div>
                  <p>Micro Backpack</p>
                  <p>$70.00</p>
                  <p>Moss</p>
                  <p>5L</p>
                </div>
                <div className="text-blue-600 flex justify-between">
                  <span className="cursor-pointer">Remove</span>
                  <div className="flex space-x-2">
                    {" "}
                    <Plus className="cursor-pointer border-2
                     rounded-md border-blue-700" />
                    <span>1</span>
                    <Plus className=" cursor-pointer border-2
                     rounded-md border-blue-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <p className="flex justify-between">
                <span>Total</span>
                <span>$341.68</span>
              </p>
            </div>
          </div>
        </div>
        {/* payment */}
        <div className="min-h-[600px] f1000:w-[60%] w-full grow bg-white px-4 py-8 f1000:px-32 flex flex-col">
          <div className="max-w-[280px] f700:max-w-[800px] mx-auto f1000:w-full">
            <div className="w-full bg-black rounded-lg flex justify-center items-center px-4 py-1">
              <AppleIcon className="text-white"/>
              <i className="text-white text-4xl fab fa-apple-pay"></i>
            </div>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 translate-x-1/2 bg-white  dark:text-white dark:bg-gray-900">
                or
              </span>
            </div>
            <Form {...form}>
       
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email address</FormLabel>
                      <FormControl className="rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="email"
                          
                         
                          {...field}
                        />
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
                      <FormLabel>Name of card</FormLabel>
                      <FormControl className="rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="text"
                          

                         
                          {...field}
                        />
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
                      <FormLabel>Expiraion date(MM/YY)</FormLabel>
                      <FormControl className="rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="date"
                         
                          {...field}
                        />
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
                      <FormLabel>CVC</FormLabel>
                      <FormControl className=" border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="text"
                         
                          {...field}
                        />
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
                      <FormLabel>Adresse</FormLabel>
                      <FormControl  className=" border-gray-400  outline-none focus:ring-2  ring-offset-2 ring-blue-700 px-4 py-2 border-1"
                          >
                        <Input
                        type="text"
                       
                         
                          {...field}
                        />
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
                        <FormLabel>Billing address is the same as shipping</FormLabel>
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
                
                <Button
                    type="submit"
                    className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                    >Pay $341.68</Button>
                
                  

                  <p className="cursor-pointer text-slate-500 flex"><ArrowLeft  className="mr-2" /> Continue to shopping</p>
                </div>
              
              </form>
      
      </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
