import React, { useState } from 'react'
import ManageProductsClient from './ManageProductsClient'
import getProducts from '../../../../actions/getProducts'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../../../../db';
import AdminNav from '../../../../components/admin/AdminNav';
import Heading from '../../../../components/Heading';
import Footer from '../../../../components/Footer';
import { redirect, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions';
const page = async() => {
  
    const products = await getProducts({category:null})
    if(!products || products.length === 0 ) return null
 const user = await getCurrentUser()
    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin/manage-products"} User = {user} />
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