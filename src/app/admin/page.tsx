import React from 'react'
import AdminNav from '../../../components/admin/AdminNav'
import Footer from '../../../components/Footer'
import { redirect } from 'next/navigation';
import { getCurrentUser, getOrders, getUsers } from '@/lib/actions';
import { Order,User } from '@prisma/client';
import Summary from './Summary';
import getProducts from '../../../actions/getProducts';
import BarGraph from './BarGraph';
import getGraphData from '../../../actions/getGraphData';

const Page = async({path,User}:{ path?: string;
  User:(User & {
   orders: Order[];
 }) | null|undefined;}) => {
  const products = await getProducts({category:null})
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()
const user = await getCurrentUser()
if(!user) redirect("/api/auth/login")
  
  return (
    <>
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <AdminNav path={"/admin"}  User = {user} />
      <main className="grow min-h-[200px] p-8">
        <div className=' space-y-4 flex flex-col justify-center text-2xl text-gray-700 lg:text-4xl'>
        <p className='text-center text-blue-700'>Bienvenue {user.firstName}{ user.lastName}</p>
        <p className='text-center'>Vous êtes en mode administrateur</p>
       
        </div>
  
    <Summary products={products} orders={orders} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px]'>
          <BarGraph data = {graphData} />
        </div>
 
        </main>

      <Footer />
    </div>
  </>
  )
}

export default Page