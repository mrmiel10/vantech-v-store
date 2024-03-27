import React from 'react'
import Image from 'next/image'
import FaU
interface AvatarProps {
    src?:string | null
}
const Avatar:React.FC<AvatarProps> = ({src}) => {
    if(src){
        <Image src={src} alt="Avatar" className='rounded-full'
        height={30}
        width={30}
        />
       }
  return (
 
  )
}

export default Avatar