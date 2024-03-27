import prisma from "../db";
export default async function getOrders() {
    try {
        const orders = await prisma.order.findMany({
            include:{
                
            }
        })
    } catch (error) {
        
    }
}