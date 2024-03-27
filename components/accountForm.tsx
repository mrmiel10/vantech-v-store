"use client";
import Link from "next/link";
import Image from "next/image";
import next from "/public/next.svg";
import { FormEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ToastDestructive from './toastForm'
import { ToastValidation } from './toastForm'
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Loader2 } from "lucide-react";
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
import User from "../index";
type defineForm = [
  ...{
    name: string;
    type: string;
    id: string;
    placeholder?: string;
    htmlFor?: string;
    valueLabel?: string;
    warmsg?: string;
  }[]
];
let spec: RegExp = /[\\s!@#$%^$*()_+\-=\[\]{};':''\\|,<>\/?àéèîôâ]/;
let testmail: RegExp = /^([a-zA-Z0-9.+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z0-9.-]+)$/;
let testnom: RegExp = /^[a-z]+[0-9]*$/i;
type defineformData = { [key: string]: [string, string] };
const schemaSignUpForm = z.object({
  email: z
    .string({
      required_error: "veuiller entrer une adrese mail",
    })
    .email({
      message: "email invalide",
    }),
  password: z
    .string({
      required_error: "veuiller entrer un mot de passe",
    })
    .min(5, { message: "votre mot de passe doit avoir au moins 5 caractères" })
    .regex(/^\S+$/, {
      message: "mot de passe incorrecte",
    }),
  checkRemember: z.boolean().default(false),
});
export type defineUser = z.infer<typeof schemaSignUpForm>

export default function AccountForm() {
  const [isSubmitting,setSubmitting] = useState<boolean>(false)
  const {toast} = useToast()
  
 
  const form = useForm<z.infer<typeof schemaSignUpForm>>({
    resolver: zodResolver(schemaSignUpForm),
    defaultValues: {
      checkRemember: true,
    },
  });
  async function onSubmit(values: z.infer<typeof schemaSignUpForm>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSubmitting(true)
    //console.log(values);
    try {
      await User(values)
      toast({
        variant:"default",
        title:"Request for database",
        description:"Your data have been submitted",
      })
     
      
    } catch (error) {
      console.log("na aps recuperer")
      //ToastDestructive()
      //console.log(error)
      toast({
        variant:"destructive",
        title:"Une erreur a été trouvée",
        description:"Impossible de se connecter au serveur",
      })

      
    }
    finally{
      setSubmitting(false)
    }
   
      
   
  }

  return (
    <>

      <Form {...form}>
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
          <div className="mx-auto flex ">
            <div className="mx-auto bg-white drop-shadow-lg max-w-[300px] f420:max-w-[400px] px-8 py-8 flex flex-col">
              <div>
                <div className="flex justify-center">
                  <Image className="w-[70px]" src={next} alt="logoNExt" />
                </div>

                <h1 className="my-4 text-center font-semibold text-[1.5rem]">
                  Sign up your account
                </h1>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl className=" border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="email"
                          placeholder="Entrer votre email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe </FormLabel>
                      <FormControl className=" border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 px-4 py-2 border-1">
                        <Input
                          type="password"
                          placeholder="Entrer votre mot de passe..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkRemember"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start space-y-0 ">
                      <div className="flex flex-row space-x-1 mb-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-black"
                          />
                        </FormControl>
                        <FormLabel>Remember</FormLabel>
                      </div>

                      <div className="space-y-1 leading-none">
                        <FormDescription>
                          Check this case for star connected permanently in our
                          website
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  {/* <Button className="bg-black">Soumettre</Button> */}
                  {isSubmitting? (
                   <Button disabled   className="bg-black"
                   ><Loader2 className="text-blue-500 animate-spin" /></Button>
                )
                :
                (
                  <Button className="bg-black">Soumettre</Button>
                )
                }
               

                </div>
               
                <div>
                  <p className="justify-center flex form:flex-row flex-col text-center text-gray-400">
                    Already an account?
                    <a className="ml-2 cursor-pointer text-blue-700 font-semibold">
                      sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

