
import React, { useEffect } from 'react'
import CarousselHome from './CarousselHome'

import { getImagesCctvCaroussel } from '@/lib/actions';
import { Suspense } from 'react';

const GetMouses = async() => {
  
          const data = await getImagesCctvCaroussel()
      
    return (
       <Suspense fallback={<p>chargement...</p>}>
    <CarousselHome data = {data} titleCaroussel ={"decouvrez nos cameras de vidéo surveillance"}  />
    </Suspense>
  
  )
}

export default GetMouses