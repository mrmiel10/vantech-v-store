import React from 'react'
import vStore from '../public/vStore.png';
import Image from 'next/image';
const NoProducts = ({text}:{text:string}) => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center space-y-2 max-w-[300px]'>
        <div className=' aspect-square w-40 h-40 relative  flex'>
        <Image
        fill
         src={vStore}
          alt="logo vantech" 
         
           className='object-contain w-full'
          />
        </div>
      
        <p className='text-blue-500 text-xl italic'>Désolé, nous ne parvenons pas à accéder à la page</p>
        </div>
        
       
    </div>
  
  )
}

export default NoProducts