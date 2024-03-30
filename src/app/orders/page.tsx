import React, { useState } from 'react'
import NavbarProfile from '../../../components/NavbarProfile'
import { getCurrentUser } from '@/lib/actions'
import { getOrdersByUserId } from '@/lib/actions'
import { redirect } from 'next/navigation'
import OrdersClient from './OrdersClient'
import Heading from '../../../components/Heading'
import Footer from '../../../components/Footer'

const page = async() => {
  const user = await getCurrentUser()
  if(!user) redirect('/')
    const orders = await getOrdersByUserId(user.id)
    if(!orders || orders.length === 0 ) return <p>Pas de commandes effectuées</p>

    return (
        <>
        
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <NavbarProfile path={""} User = {user} />
      <main className="grow min-h-[200px] pt-8 max-w-[1150px] m-auto text-xl">
  

   {/* <hr className="mx-14 border-2 border-orange-500 mb-4"/> */}
 
    <OrdersClient orders = {orders} />


   
 
        </main>

      <Footer />
    </div>
  </>
  
  )
}

export default page