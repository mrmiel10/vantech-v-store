import React from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import prisma from '../../../db'

import Footer from '../../../components/Footer'
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions';


const Page = async() => {
const user = await getCurrentUser()
if(!user) redirect("/api/auth/login")
  
  return (
    <>
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin"}  User = {user} />
      <main className="grow min-h-[200px]">
   <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
    <p className="flex flex-col f400:flex-row text-center text-2xl">Bienvenue {userData?.firstName} {userData?.lastName}</p>
  </header> 
  
 
 
        </main>

      <Footer />
    </div>
  </>
  )
}

export default Page