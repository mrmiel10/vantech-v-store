import React from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from '../../../components/Footer'
import { redirect } from 'next/navigation';


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
      <AdminNav path={"/admin"} authentificate = {authentificated} User = {userData} />
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