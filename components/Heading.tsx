interface HeadingProps{
    title:string,
    center?:boolean,
    atr?:string
}
import React from 'react'

const Heading:React.FC<HeadingProps> = ({
    title,
    center,
    atr
}) => {
  return (
   <div className={`font-bold text-2xl ${center ? "text-center" : "text-start"}${atr}`}>
      {title}

   </div>
  )
}

export default Heading