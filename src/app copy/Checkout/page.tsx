import React from 'react'
import CheckoutForm from '../../../components/Checkout'
import NavbarProfile from '../../../components/NavbarProfile'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from '../../../components/Footer';
import { redirect } from 'next/navigation';
const Page = async () => { 
let authentificated = false
const { isAuthenticated, getUser } = getKindeServerSession();
const user = await getUser();
let userInfo = null;
let userData = null;

if(!user) authentificated = false
else authentificated = true
if(user || user != null){
 
  try {
    userInfo = await prisma.user.findUnique({
      where: { kindeId: user?.id },
   });
  } catch (error) {
    authentificated = false
    redirect('/api/auth/login')
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
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <NavbarProfile path={"/"} authentificate = {authentificated} User = {userData} />
        <main className="grow">
    
       
        <CheckoutForm />
   
          </main>

        <Footer />
      </div>
   
    
    
  
    
  )
}

export default Page