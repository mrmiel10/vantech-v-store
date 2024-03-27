import React from 'react'
import NavbarProfile from '../../../components/NavbarProfile'
import ProfileForm from '../../../components/ProfileForm'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from '../../../components/Footer';
import { redirect } from 'next/navigation';
const Profile = async () => {
   
let authentificated = false 
const { isAuthenticated, getUser } = getKindeServerSession();
const user = await getUser();
let userInfo = null;
let userData = null; 

if(user){
  try {
    userInfo = await prisma.user.findUnique({
      where: { kindeId: user?.id },
   });
  } catch (error) {
    authentificated = false
    //throw error
    redirect('/api/auth/login')
   

  }
if(userInfo || userInfo != null){
 authentificated = true
 userData = {
   id: userInfo?.id,
   kindeId: user.id,
   email: userInfo.email,
   firstName: userInfo.firstName,
   lastName: userInfo.lastName,
  picture:userInfo.picture
 }
} else authentificated = false
}
else authentificated = false

console.log(authentificated)
console.log(user)
console.log(userInfo)
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <NavbarProfile User = {userData} authentificate = {authentificated} />
      <main className="grow">
      <ProfileForm  User = {userData} authentificate = {authentificated} />
      </main>
       
      <Footer />
    </div>
   
  )
}


export default Profile