import { SquareSlashIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react';

const ButtonOpenFilter = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
   <>
     <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <SquareSlashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
   </>
  )
}

export default ButtonOpenFilter