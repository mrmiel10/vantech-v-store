import { NextApiRequest, NextApiResponse } from "next";
import React from 'react'
import { defineProposition } from "../../../../index";
import * as z from "zod"
import prisma from "../../../../db"
type Data = {
    insertProposition:defineProposition
}
const propositionFormSchema = z.object({
    title:z.string({required_error:"veuiler referencier la proposition"}).min(5,{message:"minimum 5 caractèes"}).max(255,{message:"vous ave dpasser les 50 caractères"})
})
const querySchema = z.object({
    boardId: z.string()
})
export const  handler = async ( 
    req: NextApiRequest,
    res: NextApiResponse<Data>
    ) => {
   
  
    if(req.method !== "POST"){
        res.status(405).end()
        return
    }
    //queries  prisma
    const query= querySchema.parse(req.query) 
    const body = propositionFormSchema.parse(JSON.parse(req.body))
    try{
        const insertProposition = await prisma.proposition.create({
          data:{
            title:body.title,
            boardId:query.boardId

          }
        })
        res.status(201).json({insertProposition})
  
    }
        catch(error){
          throw error;
        }

       
      }
   

    
  
    
export default handler