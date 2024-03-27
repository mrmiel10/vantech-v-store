import React, { useState } from 'react'
import ManageProductsClient from './ManageProductsClient'
import getProducts from '../../../../actions/getProducts'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../../../../db';
import AdminNav from '../../../../components/admin/AdminNav';
import Heading from '../../../../components/Heading';
import Footer from '../../../../components/Footer';
import { redirect, useRouter } from 'next/navigation';
const page = async() => {
  
    const products = await getProducts({category:null})
    if(!products || products.length === 0 ) return null
    let authentificated = false
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    let userInfo = null;
    let userData = null;
    
    if(!user){
      authentificated = false
      redirect('/')
      console.log(user)
    }
    else authentificated = true
    console.log(user)
  
    if(user || user !== null){
     
      try {
        userInfo = await prisma.user.findUnique({
          where: { kindeId: user?.id },
       });
       if(!userInfo || userInfo.role !== "ADMIN"){
        authentificated =false
       redirect('/')
        
       } 
      } catch (error) {
        console.log(error)
       authentificated = false       
       redirect('/')
      }
    
    }
     if(userInfo && user) {
     userData = {
      id: userInfo?.id,
      kindeId: user.id,
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
     picture:userInfo.picture
    }
    }
    console.log(authentificated)
    console.log(user)
    console.log(userInfo)
    
    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin/manage-products"} authentificate = {authentificated} User = {userData} />
      <main className="grow min-h-[200px] pt-8 max-w-[1150px] m-auto text-xl">
  
<Heading title='Gérer les articles' center={true} atr="text-blue-700 mt-4" />
   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
 
    <ManageProductsClient products = {products} />


   
 
        </main>

      <Footer />
    </div>
  </>
    // <div className='pt-8'>
       
    // </div>
  )
}

export default page