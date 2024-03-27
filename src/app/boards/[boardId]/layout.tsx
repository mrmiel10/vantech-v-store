
import React, {PropsWithChildren } from 'react'
import prisma from '../../../../db';
import { findUniqueBoard } from '../../../../index';
export const LayoutBoard = async ({
    params,
    children,
   
} : PropsWithChildren <{
    params: {boardId: string};
    children: React.ReactNode
    
}
   > ) => {
    //const boardId = Number(params.boardId)
    //if(isNaN(boardId)) return notFound()
    const board = await findUniqueBoard(params.boardId.toString())
   
  return (
    <div>
        
            <h2 className='text-3xl'>Board {board.title}</h2>
            {children}
        
    </div>
    
  )
}
export default LayoutBoard
