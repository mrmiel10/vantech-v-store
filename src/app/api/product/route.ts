import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../../db";
export async function PUT(request: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return NextResponse.error();

  const currentuser = await prisma.user.findUnique({
    where: { kindeId: user?.id },
  });
  if (!currentuser || currentuser.role !== "ADMIN") return NextResponse.error();
  const body = await request.json()
  const {id,inStock} = body
  const product = await prisma.product.update({
    where:{id:id},
    data:{inStock},
  })
  return NextResponse.json(product)
}
