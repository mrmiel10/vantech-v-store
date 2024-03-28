import React from 'react'
import vStore from '../public/vStore.png';
import Image from 'next/image';
const NoProducts = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center space-y-2'>
        <div className=' aspect-square w-40 h-40 relative  flex'>
        <Image
        fill
         src={vStore}
          alt="logo vantech" 
         
           className='object-contain w-full'
          />
        </div>
      
        <p className='text-blue-500 text-xl italic'>Sorry, they are no available products or can&apos;t get products</p>
        </div>
        
       
    </div>
  
  )
}

export default NoProducts