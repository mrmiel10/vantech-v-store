import React from 'react'
import NavbarProfile from '../../../components/NavbarProfile'

import Footer from '../../../components/Footer'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../../../db';
import CartClient from '../../../components/CartClient';
import { getCurrentUser } from '@/lib/actions';
const Page = async () => {
  const user = await getCurrentUser()

  return (
    <>
     <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <NavbarProfile   User = {user} />
        <main className="grow py-4 min-h-[400px] flex flex-col justify-center items-center">
    <CartClient User =  {user} />
        {/* <ShoppingCart authentificate = {authentificated}/> */}
    
   
          </main>

        <Footer />
      </div>
   
       
    </>
  )
}

export default Page