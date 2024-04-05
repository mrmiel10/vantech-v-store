//"use client"
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'

import { useState } from 'react';

import { Suspense } from 'react';
import { getImagesLaptopsCaroussel } from '@/lib/actions';
const GetLaptops = async() => {
  
  const data = await getImagesLaptopsCaroussel();         
    return (       
  <Suspense fallback={<p>chargement...</p>}>
    <CarousselHome data = {data} titleCaroussel ={"decouvrez nos laptops"}  />
   </Suspense>    
  )
}

export default GetLaptops