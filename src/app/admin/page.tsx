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
   <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
    <p className="flex flex-col f400:flex-row text-center text-2xl">Bienvenue cher Admin {User?.firstName}, observez les statisitiques de VANTECH V-STORE</p>
  </header> 
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