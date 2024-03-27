"use client"
import React from 'react'
import { CartProductType, SelectedImgType } from '../ProductDetails'
import Image from 'next/image'
interface ProductImagesProps{
    cartProduct: CartProductType,
    product:any
    ,
    handleColorSelect:(value:SelectedImgType) => void;
}

const ProductImage:React.FC<ProductImagesProps> = ({
    cartProduct,
    product,
    handleColorSelect,
}) => {
  return (
    <div className='grid grid-cols-6 gap-2
    h-full
    max-h-[500px]
    min-h-[300px]
    sm:min-h-[400px]'>
        <div className='flex
         flex-col
         items-center
         justify-center
         gap-4
         cursor-pointer
         border
       
         '>
            {product.image.map((image:SelectedImgType) => {
                return (
                    <div key={image.color}
                    onClick={() => handleColorSelect(image)}
                    className={`relative w-[80%]
                    aspect-square
                    rounded
                    border-orange-500
                    ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]': 'border-none'}
                    `}
                    ><Image src={image.image} alt={image?.color ?? 'produit'} fill className='object-contain'/>
                    </div>
                )
            })}
         </div>
            <div className='col-span-5 relative aspect-square'>
                <Image fill className='w-full
                 h-full
                  object-contain'
                  src={cartProduct.selectedImg.image}
                  alt={cartProduct.name}
                  />
            </div>
    </div>
  )
}

export default ProductImage