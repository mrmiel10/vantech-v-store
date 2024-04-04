"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

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
import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import updateUser from "@/lib/actions";
import { uploadFile } from "@/lib/actions";

import { LucideArrowUpCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Order, User } from "@prisma/client";

export const updateFormSchema = z.object({
  firstname: z.string({ required_error: "veuiller entrer le nom" }).trim(),
  //.min(1, { message: "Entrer correctement le firstname" }),
  lastname: z.string({ required_error: "veuiller entrer le prenom" }).trim(),

  email: z.string().email(),
});

const ProfileForm = ({
  User,
}: {
  User:
    | (User & {
        orders: Order[];
      })
    | null
    | undefined;
}) => {
  const [imageFile, setImageFile] = useState<File>();
  const Router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [isValidateProfil, setIsValidateProfil] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsUploadImage(true);

    try {
      if (!imageFile) return;
      const form = new FormData();
      form.append("image", imageFile);

      const urlImage = await uploadFile(form, "/profil");

      //Router.refresh()
      console.log(urlImage);
      if (urlImage) setImagePreview(urlImage);

      toast.success("Téléversement effectué avec succès");
      Router.refresh();
    } catch (error) {
      console.log(error);
      return toast.error("Une erreur s'est produite");
    } finally {
      setIsUploadImage(false);
    }
  };
  const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setImageFile(file);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
        //setImageUrl(e.target.result)
      }
    };
    if (file) reader.readAsDataURL(file);
  };
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      firstname: User?.firstName ?? undefined,
      lastname: User?.lastName ?? undefined,
      email: User?.email,
    },
  });
  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    setIsValidateProfil(true)
    console.log(values);
    if (!User) return null;
    try {
      console.log(true);

      if (imagePreview == null) {
        const f = await updateUser(values, User?.kindeId);
        Router.refresh();
        Router.back();
        return;
      }
      const userUpdate = await updateUser(values, User?.kindeId, imagePreview);

      toast.success("Votre profil a été mis à jour avec succès");
      Router.refresh();
      Router.back();
    } catch (error) {
      // throw error
      return toast.error("Erreur lors de la mise à jour du profil");

    
    } finally {
      setIsValidateProfil(false)
    }
  }
  return (
    <div className="grow py-4">
      <Input
        onChange={handlePhotoChange}
        className="hidden"
        id="chooseImage"
        type="file"
        name="image"
      />

      <h1 className="text-blue-700 font-bold text-3xl text-center py-2 mb-8">
        Modifier votre profil
      </h1>
      <div className="px-4 mx-auto grid grid-cols-1 max-w-sm sm:max-w-[500px] gap-y-16 lg:gap-y-0 lg:grid-cols-2 lg:max-w-5xl min-h-[300px]">
        <div className="flex justify-center items-center flex-col lg:justify-self-start ">
          <div className="relative inline-block">
            <Avatar className="text-7xl text-orange-500 rounded-full w-48 h-48 bg-gray-200 shadow-lg font-bold flex justify-center items-center">
              <AvatarImage
                src={imagePreview ?? User?.picture}
                alt="@shadcn"
                className="object-cover"
              />
              <AvatarFallback>
                <span>
                  {User?.firstName?.[0].toUpperCase()} {User?.lastName?.[0]}
                </span>
              </AvatarFallback>
            </Avatar>
            <div className="absolute right-0 bottom-3 flex justify-center items-center w-14 h-14 bg-orange-500 rounded-full">
              <label htmlFor="chooseImage" className=" text-white">
                <Camera className="w-[40px]" />
              </label>
            </div>
          </div>
          <div className="text-gray-500 mt-2">
            <p className="text-center">
              {User?.firstName} {User?.lastName}
            </p>
            <p className="text-center">{User?.email}</p>
            {isUploadImage ? (
              <Button
                disabled
                className="w-full inline-flex justify-center items-center my-2 bg-blue-700"
                onClick={handleSubmit}
              >
                <Loader2 className="animate-spin text-white" />{" "}
                <LucideArrowUpCircle className="mr-2 hidden" />
                Televerser l&apos;image
              </Button>
            ) : (
              <Button
                className="w-full inline-flex justify-center items-center my-2 bg-blue-700"
                onClick={handleSubmit}
              >
                {" "}
                <LucideArrowUpCircle className="mr-2" />
                Televerser l&apos;image
              </Button>
            )}

            <p className="text-center">
              {" "}
              <Link href={"#"} className="text-center text-gray-500">
                En savoir plus sur le téléversement des fichiers
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-orange-500 text-xl text-center mb-4">
            Informations sur le compte
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      {/* <FormLabel htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Firstname</FormLabel> */}

                      <FormControl id="floating_filled">
                        <Input
                          {...field}
                          type="text"
                          placeholder=""
                          className={cn(
                            "w-full focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 block rounded-t-lg px-2.5 py-10 pb-2.5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer "
                          )}
                          // className="focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer"
                        />
                      </FormControl>
                      <label
                        htmlFor="floating_filled"
                        className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Firstname
                      </label>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Firstname</FormLabel> */}

                    <FormControl id="floating_filled">
                      <Input
                        {...field}
                        disabled
                        type="email"
                        placeholder=" "
                        className={cn(
                          "w-full focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 block rounded-t-lg px-2.5 py-10 pb-2.5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer "
                        )}
                        // className="focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl id="floating_filled">
                        <Input
                          {...field}
                          type="text"
                          placeholder=""
                          className={cn(
                            "w-full focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 block rounded-t-lg px-2.5 py-10 pb-2.5 text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer "
                          )}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="floating_filled"
                        className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Lastname
                      </FormLabel>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2 flex justify-center">
                <Button
                  type="reset"
                  onClick={() => {
                    Router.back();
                  }}
                  className="bg-orange-500 hover:bg-orange-600 rounded-xl"
                >
                  Annuler
                </Button>
                {isValidateProfil ? (
                  <Button
                    disabled
                    type="submit"
                    className="inline-flex justify-center items-center bg-blue-700 hover:bg-blue-900 text-white rounded-md p-4"
                  >
                    <Loader2 className="animate-spin text-white" />
                    Appliquer les changements
                  </Button>
                ) : (
                  <Button
                    
                    type="submit"
                    className="inline-flex justify-center items-center bg-blue-700 hover:bg-blue-900 text-white rounded-md p-4"
                  >
                    {" "}
                    Appliquer les changements
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
