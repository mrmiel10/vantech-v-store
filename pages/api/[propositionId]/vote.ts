import { NextApiRequest, NextApiResponse } from "next";
import React from 'react'
import { defineVote } from "../../../index";
import * as z from "zod"
import prisma from "../../../db";
type Data = {
    insertVote:defineVote
}
const querySchema = z.object({
    propositionId:z.string()
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
    //const body = propositionFormSchema.parse(JSON.parse(req.body))
    try{
        const insertVote = await prisma.vote.create({
            data:{
                propositionId: query.propositionId
            }
        })
        res.status(201).json({insertVote})
  
    }
        catch(error){
          throw error;
        }

       
      }
   

    
  
    
export default handler