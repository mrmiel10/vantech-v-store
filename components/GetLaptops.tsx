"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';
import { getImagesLaptopsCaroussel } from '@/lib/actions';

const GetLaptops = () => {
    const [allImage, setAllImage] = useState<ListBlobResultBlob[] | null>(null)
    const [isImages,setIsImages] = useState<boolean>(false)
    useEffect(()=>{
      const getAllImage = async()=>{
        try {
          const data = await getImagesLaptopsCaroussel()
          setAllImage(data)
          setIsImages(true)
         } catch (error) {
          setIsImages(false)
         }
      }
     getAllImage()

    },[allImage])
    
      if(!isImages) {
        return null
      }
    return (
    <CarousselHome data = {allImage} titleCaroussel ={"decouvrez nos laptops"}  />
  )
}

export default GetLaptops