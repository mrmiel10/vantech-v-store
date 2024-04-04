
import { NextResponse } from "next/server";
import prisma from "../../../../db";
import { getCurrentUser } from "@/lib/actions";
import { getUserById } from "@/lib/actions";
export async function POST(request: Request) {
  const user = await getCurrentUser()
  if(!user)  return NextResponse.error();
  //if(user.role !== "ADMIN"){
 //  return NextResponse.error();
 // } 
  
  
  
  //orderUser?.orders
  return NextResponse.json(user)
}
