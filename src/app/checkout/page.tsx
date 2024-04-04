import React from 'react'
import CheckoutForm from '../../../components/Checkout'
import NavbarProfile from '../../../components/NavbarProfile'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from '../../../components/Footer';
import { redirect } from 'next/navigation';
import CheckoutClient from './CheckoutClient';
import { getCurrentUser } from '@/lib/actions';


const Page = async () => { 
const user = await getCurrentUser()
if(!user) redirect('/')
  
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <NavbarProfile path=""  User = {user} />
        <main className="grow min-h-[300px] flex justify-center items-center p-8">
    <CheckoutClient />
       
        {/* <CheckoutForm /> */}
   
          </main>

        <Footer />
      </div>
   
    
    
  
    
  )
}

export default Page