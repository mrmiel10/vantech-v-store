import React from 'react'
import AdminNav from '../../../../components/admin/AdminNav'
import Footer from '../../../../components/Footer'
import prisma from '../../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Heading from '../../../../components/Heading'
import AddProductsForm from './AddProductsForm';

import { redirect} from 'next/navigation';
const Page = async() => {
    
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
      <AdminNav path={"/admin/add-products"} authentificate = {authentificated} User = {userData} />
      <main className="grow min-h-[200px]">
  
<Heading title='Ajouter un article' center={true} atr="text-blue-700 mt-4" />
   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
  
 <AddProductsForm />
 
        </main>

      <Footer />
    </div>
  </>
  )
}

export default Page