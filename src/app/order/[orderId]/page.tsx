import React from 'react'
import Footer from '../../../../components/Footer'
import NavbarProfile from '../../../../components/NavbarProfile'
import OrderDetails from './OrderDetails';
import { getOrderById } from '@/lib/actions';
import NoProducts from '../../../../components/NoProducts';
import { getCurrentUser } from '@/lib/actions';
interface IParams {
    orderId:string
}
const Order = async ({params} : {params:IParams}) => {
const order =await getOrderById(params.orderId)


if(!order) return <NoProducts text="Désolé nous ne parvenons pas à accéder à la commande" />
 const user = await getCurrentUser()
    console.log(params)
   
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
     <NavbarProfile User={user}/>
    <main className="grow p-8">
        
      <OrderDetails order={order}/>
      
       </main>

    <Footer />
  </div>
  )
}

export default  Order