
"use client"
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Checkbox } from "@/components/ui/checkbox"

type FormData = {
  username:string,
  email:string,
  password:string,
  checkconfident:boolean
}
const formSchema = z.object({
  username: z.string({
    required_error:'please enter your name'
  }).min(5, {
    message: "Username must be at least 5 characteres.",
  }),
  email: z.string({
    required_error:'please enter an email'
  }).email({
    message: "email is invalid.",
  }),
  password: z.string({
    required_error:'please enter your password'
  }).regex(/^\S+$/,{message:"mauvais format du mot de passe"}),

  checkConfident: z.boolean().default(false).optional(),

})
// .refine(data =>data !=undefined && data != null,{
//   message:"veuiller relplir tou les chzlos",
//   path:["requiredinput"],
// })
export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //username: "",
       checkConfident: true,
    },
   
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>              
              <FormMessage />
          
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>             
              <FormMessage />
            </FormItem>
          )}
        />
       
       <FormField
          control={form.control}
          name="checkConfident"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}
                  <Link href="/examples/forms">mobile settings</Link> page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
     
        <Button type="submit" className="bg-red-500" >Submit</Button>
      </form>
    </Form>
  )
}
