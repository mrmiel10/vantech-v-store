import React from 'react'
import CheckoutForm from '../../../components/Checkout'
import NavbarProfile from '../../../components/NavbarProfile'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
const Page = async () => { 
let authentificated = false
const { isAuthenticated, getUser } = getKindeServerSession();
const user = await getUser();
let userInfo = null;
let userData = null;

if(!user) authentificated = false
else authentificated = true
if(user || user != null){
 
  userInfo = await prisma.user.findUnique({
    where: { kindeId: user?.id },
 });
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
    <NavbarProfile path={"/Checkout"} authentificate = {authentificated} User = {userData}  />
    <CheckoutForm />
    </>
    
  )
}

export default Page