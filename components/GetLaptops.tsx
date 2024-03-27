//"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';
import { getImagesLaptopsCaroussel } from '@/lib/actions';

const GetLaptops = async() => {
   
   
          const data = await getImagesLaptopsCaroussel()
         
    return (
    <CarousselHome data = {allImage} titleCaroussel ={"decouvrez nos laptops"}  />
  )
}

export default GetLaptops