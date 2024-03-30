import React, { useState } from 'react'
import prisma from '../../../../db';
import AdminNav from '../../../../components/admin/AdminNav';
import Heading from '../../../../components/Heading';
import Footer from '../../../../components/Footer';
import { redirect, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions';
import { getOrders } from '@/lib/actions';
import ManageOrdersClient from './ManageOrdersClient';
import NoProducts from '../../../../components/NoProducts';
const page = async() => {
  const user = await getCurrentUser()
  if(!user || user.role !== "ADMIN" ) redirect("/")
    const orders = await getOrders()
    if(!orders || orders.length === 0 ) return <NoProducts text='Nous ne parvenons pas à charger les commandes' />
 
    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin/manage-orders"} User = {user} />
      <main className="grow min-h-[200px] pt-8 max-w-[1150px] m-auto text-xl">
  

   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
 
    <ManageOrdersClient orders = {orders} />


   
 
        </main>

      <Footer />
    </div>
  </>
    // <div className='pt-8'>
       
    // </div>
  )
}

export default page