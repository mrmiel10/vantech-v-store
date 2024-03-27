"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';
import { getImagesCaroussel } from '@/lib/actions';

const GetAll = () => {
    const [allImage, setAllImage] = useState<ListBlobResultBlob[] | null>(null)
    const [isAllImage,setIsAllImage] = useState<boolean>(false)
    useEffect(()=>{
      const getAllImage = async()=>{
        try {
          const data = await getImagesCaroussel()
          setAllImage(data)
           setIsAllImage(true)
         } catch (error) {
           setIsAllImage(false)
         }
      }
     getAllImage()

    },[allImage])
    
      if(!isAllImage) {
        return null
      }
    return (
    <CarousselHome data = {allImage} titleCaroussel ={"Découvrez les produits de VANTECH V-STORE"}  />
  )
}

export default GetAll