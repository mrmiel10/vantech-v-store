"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';

import { getImagesDesktopsCaroussel } from '@/lib/actions';

const GetDesktops =() => {
    const [allImage, setAllImage] = useState<ListBlobResultBlob[] | null>(null)
    const [isImages,setIsImages] = useState<boolean>(false)
    useEffect(()=>{
      const getAllImage = async()=>{
        try {
          const data = await getImagesDesktopsCaroussel()
          setAllImage(data)
           setIsImages(true)
         } catch (error) {
           setIsImages(false)
         }
      }
     getAllImage()

    },[])
    
      if(!isImages) {
        return null
      }
    return (
    <CarousselHome data = {allImage} titleCaroussel ={"Découvrez nos desktops"}  />
  )
}

export default GetDesktops