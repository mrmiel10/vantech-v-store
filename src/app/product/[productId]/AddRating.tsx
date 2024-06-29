"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, Product, Review, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Heading from "../../../../components/Heading";
import { Rating } from "@mui/material";
import FormRating from "../../../../components/FormRating";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

//import {SafeUser} from "@"
interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (User & {
        orders: Order[];
      })
    | null
    | undefined;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
 const formValidateComment = z.object({
    comment: z
      .string({
        required_error: "votre commentaire est vide",
      }).trim().min(1,{message:"commentaire incorrecte"})
     
      .max(50, { message: "commentaire trop long" }),
    rating: z.coerce.number(
),
  });
  const form = useForm<z.infer<typeof formValidateComment>>({
    resolver: zodResolver(formValidateComment),
    defaultValues: {
      comment: undefined,
      rating: 0,
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
   setIsLoading(true)
    if(values.rating === 0){
      setIsLoading(false)
      return toast.error("Vous n'avez pas sélectionner d'étoiles");
    } 
    const ratingData = {...values,userId:user?.id,product:product}
    axios.post('/api/rating',ratingData).then(()=>{
    toast.success('Votre note a été soumise');
    router.refresh();
      form.reset(); 
    
  })
  .catch((error)=>{
  

    console.log(error)
   toast.error('Une erreur a été trouvée')
  })
 .finally(()=>{
  setIsLoading(false)
 })

}
if(!user || !product) return null
const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) && order.deliveryStatus === "delivered")
const userReview = product?.reviews.find((review:Review)=>{
    return review.userId === user.id
})
if(userReview || !deliveredOrder) return null

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
  const classInput = ` peer font-light rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 border  p-8 pt-10`;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Noter l'article" atr=" text-blue-700" />
       <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />  
   <div >
        
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
                  className="mb-2 w-full inline-flex justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                >
                     <Loader2 className=" text-blue-500 animate-spin mr-2" />
                  Commenter
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type="submit"
                  className="mb-2 w-full inline-flex  justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
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

export default AddRating;
