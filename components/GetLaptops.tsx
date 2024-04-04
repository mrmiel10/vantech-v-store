//"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'

import { useState } from 'react';
import { getImagesLaptopsCaroussel, getImagesMousesCaroussel } from '@/lib/actions';
import { Suspense } from 'react';

const GetLaptops = async() => {
  
  const data = await getImagesMousesCaroussel();         
    return (       
  <Suspense fallback={<p>chargement...</p>}>
    <CarousselHome data = {data} titleCaroussel ={"decouvrez nos laptops"}  />
   </Suspense>    
  )
}

export default GetLaptops