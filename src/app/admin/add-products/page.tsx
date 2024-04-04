import React from 'react'
import AdminNav from '../../../../components/admin/AdminNav'
import Footer from '../../../../components/Footer'
import prisma from '../../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Heading from '../../../../components/Heading'
import AddProductsForm from './AddProductsForm';

import { redirect} from 'next/navigation';
import { getCurrentUser } from '@/lib/actions';
const Page = async() => {
    const user = await getCurrentUser()
    if(!user || user.role !== "ADMIN") redirect("/")
  return (

    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin/add-products"}  User = {user} />
      <main className="grow min-h-[200px]">
  

   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
  
 <AddProductsForm />
 
        </main>

      <Footer />
    </div>
  
  )
}

export default Page