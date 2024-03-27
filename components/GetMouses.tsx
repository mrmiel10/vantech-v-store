"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';
import { getImagesMousesCaroussel } from '@/lib/actions';

const GetMouses = () => {
    const [allImage, setAllImage] = useState<ListBlobResultBlob[] | null>(null)
    const [isImages,setIsImages] = useState<boolean>(false)
    useEffect(()=>{
      const getAllImage = async()=>{
        try {
          const data = await getImagesMousesCaroussel()
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
    <CarousselHome data = {allImage} titleCaroussel ={"decouvrez nos souris"}  />
  )
}

export default GetMouses