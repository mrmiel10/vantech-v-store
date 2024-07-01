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
import order from "../../../public/order.jpg"
import Image from 'next/image';
const page = async() => {
  const user = await getCurrentUser()
  if(!user || user.role !== "ADMIN" ) redirect("/")
    const orders = await getOrders()
    
 
    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin/manage-orders"} User = {user} />
      <main className="grow min-h-[200px] pt-8 max-w-[1150px] m-auto text-xl">
      {!orders || orders.length === 0 ? (
            <>
              <Image src={order} alt="aucune commande" width={400} />
              <p className="text-blue-900 font-semibold">
                Aucune commande effectuée pour l&apos;instant
              </p>
            </>
          ) : (
            <ManageOrdersClient orders = {orders} />
          )}
    


   
 
        </main>

      <Footer />
    </div>
  </>
    // <div className='pt-8'>
       
    // </div>
  )
}

export default page