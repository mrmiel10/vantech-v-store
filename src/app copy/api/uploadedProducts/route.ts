import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:Request) {
    
   
   //const body = await request.json()
  // console.log(body)
   // const item = body
    try {
        const { searchParams } = new URL(request.url);
        const body = await request.json()
        const filename = searchParams.get('filename');
        console.log("fou")
    
     console.log(body)
        // console.log(filename)
        // console.log("hibou")
         const blob = await put(`product/${filename}`,body, {
           access: "public",
           token:process.env.BLOB_READ_WRITE_TOKEN
         })
         return NextResponse.json({url:blob.url})
       //  return blob.url
       } catch (error) {
         console.log(error)
         return NextResponse.error()
         //throw error
       }
       
  }
    