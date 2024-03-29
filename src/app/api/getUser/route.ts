
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
  const body = await request.json()
  const {userId} = body
  const userOrder = await getUserById(userId)
  //orderUser?.orders
  return NextResponse.json(userOrder?.orders)
}
