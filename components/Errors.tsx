import React from 'react'
import { FieldErrors } from 'react-hook-form'
interface ErrorsMessageProps{
    id:string,
    msg:string,
errors:FieldErrors
}
const Errors:React.FC<ErrorsMessageProps> = ({id,msg,errors}) => {
  return (
    <>
        {errors[id] ? (
            <p className='mt-4 text-red-500'>{msg}</p>
        )
        :
        (
          <p></p>  
        )
        
        }
    </>
  
   )
}
  


export default Errors