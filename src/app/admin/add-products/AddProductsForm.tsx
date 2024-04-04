"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/lib/Categories";
import { colors } from "@/lib/Colors";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import Errors from "../../../../components/Errors";
import prisma from "../../../../db";
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
import { Checkbox } from "@/components/ui/checkbox";

import CategoryInput from "../../../../components/CategoryInput";
import SelectColor from "../../../../components/inputs/SelectColor";

import { addProducts, uploadFile } from "@/lib/actions";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import Heading from "../../../../components/Heading";
export type imageType = {
  color?: string;
  colorCode?: string;
  image: File | null;
};
export type uploadImageType = {
  color: string;
  colorCode: string;
  image: string;
};
const AddProductsForm = () => {
  const Router = useRouter();
  const formValidateProducts = z.object({
    name: z
      .string({
        required_error: "veuiller entrer le nom de l'article",
      })

      .trim(),
    // .min(1, { message: "entrer un nom d'article valide" }),
    description: z
      .string({
        required_error: "veuiller la descriptiion de l'article",
      })
      .trim()

      .max(1000, { message: "vous avez atteint le max de mot" }),
    brand: z
      .string({
        required_error: "veuiller entrer la marque de l'article",
      })
      .trim(),
    category: z
      .string({ required_error: "veuiller choisir la catégorie de l'article" })
      .trim(),
    inStock: z.boolean(),
    images: z.any(),
    price: z.coerce.number({
      required_error: "veuiller entrer le prix de l'article",
      invalid_type_error: "Veuiller entrer un nombre",
    }),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<imageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  console.log(images);
  const form = useForm<z.infer<typeof formValidateProducts>>({
    resolver: zodResolver(formValidateProducts),
    defaultValues: {
      name: undefined,
      description: undefined,
      brand: undefined,
      category: undefined,
      inStock: false,
      images: [],
      price: undefined,
    },
  });
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      form.reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [form]);
  const category = form.watch("category");
  const setCustomValue = (id: any, value: any) => {
    form.setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const addImageToState = useCallback((value: imageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: imageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter((item) => {
          item.color !== value.color;
        });
        return filteredImages;
      }
      return prev;
    });
  }, []);
  async function onSubmit(values: z.infer<typeof formValidateProducts>) {
    setIsLoading(true);
    console.log(values);
    let uploadedImages: uploadImageType[] = [];
    console.log(uploadedImages);
    if(!values.images || values.images.length === 0){
      setIsLoading(false)
      toast.error("Pas d'images sélectionnées")
      return
    }
    const handleImageUploads = async () => {
      toast("creating product,please wait...");
      try {
        for (const item of values.images) {
          if (item.image) {
            const filename = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Eror uploading image", error);
                  return toast.error("Error handling image uploads");

                  reject(error);
                 

                  /*switch (error.code) {
       case 'storage/unauthorized':
         // User doesn't have permission to access the object
         break;
       case 'storage/canceled':
         // User canceled the upload
         break;
     
       // ...
     
       case 'storage/unknown':
         // Unknown error occurred, inspect error.serverResponse
         break;
     }*/
                },
                () => {
                  {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                      .then((downloadURL) => {
                        uploadedImages.push({
                          ...item,
                          image: downloadURL,
                        });
                        console.log("File available at", downloadURL);
                        resolve();
                      })
                      .catch((error) => {
                        console.log("Error getting the download URL", error);
                        return toast.error("Error handling image uploads");
                        
                        reject(error);
                      });
                  }
                }
              );
            });
          } else return null;
        }
      } catch (error) {
        console.log("Error handling image uploads", error);
        toast.error("Error handling image uploads");
       
        //toast.error("nous n'arrivons pas à upload le fichier");
      } finally {
        setIsLoading(false);
      }
    };

    await handleImageUploads();
    const productData = { ...values, images: uploadedImages };
    console.log(productData);
    console.log(uploadedImages);
    try {
      const product = await addProducts(productData);
      toast.success("votre produit a bien eté crée");
      Router.refresh();
    } catch (error) {
      toast.error("votre produit n'a pas ete crée");
    }
    finally{
      setIsLoading(false)
    }
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
  const classInput = ` peer font-light rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 border  p-8 pt-10`;
  return (
    <div className="flex justify-center items-center  w-full">
      <div className="flex flex-col px-4 py-4 w-[300px] sm:w-[600px]">
        <div className="flex justify-center items-center min-h-[50px]">
        <Heading title='Ajouter un article' center={true} atr=" text-blue-700 my-4" />
        </div>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl id="name" className={`${classInput}`}>
                      <Input
                        className="peer"
                        id="name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel htmlFor="name" className={`${classLabel}`}>
                      Nom
                    </FormLabel>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl id="brand" className={`${classInput}`}>
                      <Input className="" id="brand" type="text" {...field} />
                    </FormControl>
                    <FormLabel htmlFor="brand" className={classLabel}>
                      Marque
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl id="price" className={`${classInput}`}>
                      <Input id="price" type="text" {...field} />
                    </FormControl>
                    <FormLabel htmlFor="price" className={classLabel}>
                      Prix
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative">
                    <FormControl
                      id="descp"
                      className=" max-h-[150px]
        min-h-[150px] peer font-light rounded-lg border-gray-400  outline-none focus:ring-2 ring-offset-2 ring-blue-700 border p-8 pt-10"
                    >
                      <Input id="descp" type="text" {...field} />
                    </FormControl>
                    <FormLabel htmlFor="descp" className={classLabel}>
                      Description
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex flex-row space-x-1 mb-2">
                    <FormControl id="inStock">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-blue-700"
                      />
                    </FormControl>
                    <FormLabel htmlFor="inStock" className="text-gray-500">
                      Produit dans le stock
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="w-full font-medium">
              <div className="mb-2 font-semibold text-orange-500">
                Choisir la catégorie de l&apos;article
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3">
                {categories.map((item, index) => {
                  if (item.label === "All") return null;
                  return (
                    <div className="col-span" key={item.label}>
                      <CategoryInput
                        onClick={(category) =>
                          setCustomValue("category", category)
                        }
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                      />
                    </div>
                  );
                })}
              </div>
              <Errors
                msg={"veuiller choisir la categorie de l'article"}
                id="category"
                errors={form.formState.errors}
              />
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
              <div>
                <div className="font-bold text-orange-500">
                  Selectionner les produits avec les couleurs disponibles et
                  leurs images
                </div>
                <div className="text-orange-700">
                  Vous devez choisir une image pour chaque couleur de produit
                  sélectionnée
                </div>
              </div>
              <input className="hidden" name="productImage" />
              <div className="grid grid-cols-2 gap-3">
                {colors.map((item, index) => {
                  return (
                    <SelectColor
                      key={index}
                      item={item}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                    />
                  );
                })}
              </div>
            </div>
            {isLoading ? (
                 <div>
                 <Button
                 disabled
                   type="submit"
                   className="mb-2 w-full inline-flex  justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
                 >
                    <Loader2 className="text-white animate-spin mr-2" />
                   ajouter l&apos;article
                 </Button>
               </div>
            )
          :
          (
            <div>
            <Button
              type="submit"
              className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
            >
            
              ajouter l&apos;article
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
