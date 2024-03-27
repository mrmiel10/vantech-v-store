import React from 'react'
import NavbarProfile from '../../../components/NavbarProfile'
import ShoppingCart from '../../../components/CartShopping'
import Footer from '../../../components/Footer'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from '../../../db';
import CartClient from '../../../components/CartClient';
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
        <NavbarProfile  authentificate = {authentificated} User = {userData} />
        <main className="grow py-4 min-h-[400px] flex flex-col justify-center items-center">
    <CartClient authentificate = {authentificated} />
        {/* <ShoppingCart authentificate = {authentificated}/> */}
    
   
          </main>

        <Footer />
      </div>
   
       
    </>
  )
}

export default Page