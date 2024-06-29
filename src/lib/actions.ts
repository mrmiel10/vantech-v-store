"use server"
import Error from "@/app/error";
import prisma from "../../db"
import {put} from "@vercel/blob"
import { list } from "@vercel/blob";
import { uploadImageType } from "@/app/admin/add-products/AddProductsForm";
import { product } from "../../components/product";
import { formatPrice } from "./formatPrice";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
type userUpdate = {   
        firstname: string;
        lastname: string;
}
type product = {
  images: uploadImageType[];
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  inStock: boolean;
}
const updateUser = async(values:userUpdate,id:string,image?:string) =>{
 try {
  if(image){
    const updateUser = await prisma.user.update({
      where:{
        kindeId:id
      },
      data:{
        firstName:values.firstname,
        lastName:values.lastname,
        picture:image
              
      }
     })
     return updateUser
  }
  const updateUser = await prisma.user.update({
    where:{
      kindeId:id
    },
    data:{
      firstName:values.firstname,
      lastName:values.lastname,
            
    }
   })
   return updateUser
 } catch (error) {
  throw error
 }

}
export default updateUser

export const uploadFile = async(form:FormData,folder:string) =>{
  try {
    const file = form.get("image") as File
  //console.log(file)
  //if(file != null){
    const filename = file.name
    const blob = await put(`${folder}/${filename}`,file, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.log(error)
    throw error
  }
  
 // }

}
export const getImagesCaroussel = async() =>{
  try {
    const {
      folders: [all],
      blobs: rootBlobs,
    } = await list({ mode: 'folded' });
     
    const { folders, blobs } = await list({ mode: 'folded', prefix:'all/'});
  //  console.log(blobs)
  
    //console.log(folders)
    return blobs
  } catch (error) {
    throw error
  }
  
}
export const getImagesDesktopsCaroussel = async() =>{
  try {
    const {
      folders: [desktops],
      blobs: rootBlobs,
    } = await list({ mode: 'folded' });
     
    const { folders, blobs } = await list({ mode: 'folded', prefix:'desktops/'});
   // console.log(blobs)
  
    //console.log(folders)
    return blobs
  } catch (error) {
    throw error
  }
  
}
export const getImagesMousesCaroussel = async() =>{
  try {
    const {
      folders: [mouses],
      blobs: rootBlobs,
    } = await list({ mode: 'folded' });
     
    const { folders, blobs } = await list({ mode: 'folded', prefix:'mouses/'});
   // console.log(blobs)
  
    //console.log(folders)
    return blobs
  } catch (error) {
    throw error
  }
  
}
export const getImagesCctvCaroussel = async() =>{
  try {
    const {
      folders: [cctv],
      blobs: rootBlobs,
    } = await list({ mode: 'folded' });
     
    const { folders, blobs } = await list({ mode: 'folded', prefix:'cctv/'});
    //console.log(blobs)
  
    //console.log(folders)
    return blobs
  } catch (error) {
    throw error
  }
  
}
export const getImagesLaptopsCaroussel = async() =>{
  try {
    const {
      folders: [laptop],
      blobs: rootBlobs,
    } = await list({ mode: 'folded' });
     
    const { folders, blobs } = await list({ mode: 'folded', prefix:'laptop/'});
//console.log(blobs)
    return blobs
  } catch (error) {
    throw error
  }
  
}
export const addProducts = async(products:product)=>{
  try{
    const product = await prisma.product.create({
      data:{
        name:products.name,
        description:products.description,
        brand:products.brand,
        category:products.category,
        inStock:products.inStock,
        image:products.images,
        price:products.price
      }
    })
    return product
  }catch(error){
    throw error
  }
}
export const uploadProduct = async(item:any,folder:string) =>{
  try {
   // const file = form.get("image") as File
  //console.log(file)
  //if(file != null){
    const filename = item.image.filename
    const blob = await put(`${folder}/${filename}`,item, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.log(error)
    throw error
  }
  
 // }

}
export const deleteProduct = async(id:string)=>{
  try {
    const productDelete = await prisma.product.delete({
      where:{id:id}
    })
  
    return deleteProduct
  } catch (error) {
    throw error
  }
}
export const getProductById = async(productId:string)=>{
  try {
    const product = await prisma.product.findUnique({
      where:{
        id:productId
      },
      include:{
        reviews:{
          include:{
            user:true
          },
          orderBy:{
            createdDate:'desc'
          }
        }
      }
    })
    if(!product) return null
    return product
  } catch (error) {
    console.log(error)
    return null
    //throw error

  }
} 
export const getCurrentUser = async()=>{ 
  const {getUser } = getKindeServerSession();
  const user = await getUser();
  try {
  if(!user){   
    console.log(user)
    return null
  }
  else 
  //console.log(user)

  /*if(user || user !== null)*/{ 
   
      const userInfo = await prisma.user.findUnique({
        where: { kindeId: user?.id },
        include:{
          orders:true
        }
     });
     if(!userInfo ){
    
      return null      
     } 
     return userInfo    
    } 
  }catch (error) {   
      
     return null   
  
    }
  
  }
 export const getOrderById = async(orderId:string)=>{
  try{
    const order = await prisma.order.findUnique({
      where:{
        id:orderId,
      },
      include:{
        user:true
      }
    })
    if(!order) return null
    return order
  }
  catch(error){
   // throw error
   return null
  }
 }
 export const getOrders = async() =>{
  try {
    const orders = await prisma.order.findMany({
        include:{
            user:true
        },
        orderBy:{
            createdDate:"desc"
        }
    })
  //  if(!orders) return null
    return orders
} catch (error) {
   // return null
   throw error
}
 }
 export const getOrdersByUserId = async(userId:string) => {
  try {
    const orders = await prisma.order.findMany({
        include:{
            user:true
        },
        orderBy:{
            createdDate:"desc"
        },
        where:{
          userId:userId
        }
    })
    if(!orders) return null
    return orders
} catch (error) {
    return null
}

 }
 export const getUserById = async(userId:string) =>{
  try {
    const userById = await prisma.user.findUnique({
      where:{
       id:userId
      },
      include:{
        orders:true
      }
     })
     if(!userById) return null
     return userById
  } catch (error) {
    return null
  }
 
 }
 export const getUsers = async() =>{
  try {
    const users = await prisma.user.findMany({})
   /// if(!users) return null
    return users
  } catch (error:any) {
    //throw new Error(error)
   // return null
   throw  error
  }
 

 }
