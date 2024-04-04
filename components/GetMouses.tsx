
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'
import { ListBlobResultBlob, list } from '@vercel/blob';
import { useState } from 'react';
import { getImagesMousesCaroussel } from '@/lib/actions';
import { Suspense } from 'react';

const GetMouses = async() => {
  
          const data = await getImagesMousesCaroussel()
      
    return (
       <Suspense fallback={<p>chargement...</p>}>
    <CarousselHome data = {data} titleCaroussel ={"decouvrez nos souris"}  />
    </Suspense>
  
  )
}

export default GetMouses