import React from 'react'
import NavbarProfile from '../../../components/NavbarProfile'
import ProfileForm from '../../../components/ProfileForm'
import prisma from '../../../db'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Footer from '../../../components/Footer';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions';
const Profile = async () => {
 const user =await  getCurrentUser() 
 if(!user) redirect('/') 

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
      <NavbarProfile User = {user}  />
      <main className="grow">
      <ProfileForm  User = {user}  />
      </main>
       
      <Footer />
    </div>
   
  )
}


export default Profile