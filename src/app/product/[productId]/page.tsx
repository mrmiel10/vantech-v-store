import React from 'react'
import Footer from '../../../../components/Footer'
import NavbarProfile from '../../../../components/NavbarProfile'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import ProductDetails from '../../../../components/ProductDetails';
import ListRating from './ListRating';
import { getProductById } from '@/lib/actions';
import AddRating from './AddRating';
import { getCurrentUser } from '@/lib/actions';
import NoProducts from '../../../../components/NoProducts';

interface IParams {
    productId:string
}
const Product = async ({params} : {params:IParams}) => {
const product =await getProductById(params.productId)


if(!product) return <NoProducts text="Désolé nous ne parvenons pas à accéder à l'article" />
 const user = await getCurrentUser()
    console.log(params)
   
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
     <NavbarProfile User={user}/>
    <main className="grow px-8 py-4">
      <ProductDetails product={product}/>
      <div className='flex flex-col mt-20 gap-4'>
       <AddRating product={product} user={user} />
       <ListRating product={product} />
        </div>
       </main>

    <Footer />
  </div>
  )
}

export default  Product