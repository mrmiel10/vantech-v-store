import React from 'react'
import {IconType} from 'react-icons'
interface CategoryInputProps{
    selected?:boolean
    label:string
    icon:IconType;
    onClick:(value:string) => void
}
const CategoryInput:React.FC<CategoryInputProps> = ({
    selected,
    label,
    icon:Icon,
    onClick,

}) => {
  return (
    <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-blue-500 transition cursor-pointer ${selected ? "border-blue-500" : "border-slate-200"}` }>
    <Icon size={30} className='text-orange-500' />
    <div className="font-medium text-orange-700">{label}</div>
    
    </div>
   
  )
}

export default CategoryInput