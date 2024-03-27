"use client"
import {useDropzone} from 'react-dropzone'
import { imageType } from "@/app/admin/add-products/AddProductsForm"
interface SelectImageProps{
    item?:imageType,
    handleFileChange:(value:File) => void
}
import React, { useCallback } from 'react'

const SelectImage:React.FC<SelectImageProps> = ({item,handleFileChange}) => {
    const onDrop = useCallback((acceptedFiles:File[]) => {
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0])
        }
      }, [handleFileChange])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        accept:{"image/*":[".jpeg",".png"]},
    })
    return (
    <div  {...getRootProps()} className='border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal
    text-slate-400 flex items-center justify-center
    
    '>
       <input  {...getInputProps()} />
       {isDragActive ? (<p>Mettre l&apos;image ici....</p>):
       (<p>{item?.color} Image</p>)}
    </div>
  )
}

export default SelectImage