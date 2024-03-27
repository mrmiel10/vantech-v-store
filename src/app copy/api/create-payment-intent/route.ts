import Stripe from 'stripe'
import prisma from '../../../../db'
import { CartProductType } from '@prisma/client'
import { getCurrentUser } from '@/lib/actions'
import { NextResponse } from 'next/server'

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY as string,
    {
        apiVersion:'2023-10-16'
    })
    const calculateOrderAmount = (items:CartProductType[]) =>{
        const totalPrice = items.reduce((acc,item)=>{
            const itemTotal = item.price * item.quantity
            return acc * itemTotal;
        },0)
        return totalPrice
    }
    
    export async function POST(request:Request){
        const currentUser = await getCurrentUser()
        if(!currentUser) return NextResponse.json({error:"Pas autorisé"},{status:401})
        const body = await request.json()
    
        const {items,payment_intent_id} = body
        const total = calculateOrderAmount(items) * 100
        const orderData = {
        user:{connect:{id:currentUser.id}},
        amount:total,
        currency: 'FCFA',
        deliveryStatus: "pending",
        paymentIntentId:payment_intent_id,
        tId:payment_intent_id,
        products:items

    }
    if(payment_intent_id){
        //mettre à jour la commande
    }
    else{
        //
        const paymentIntent = await stripe.paymentIntents.create({
            amount:total,
            currency:"FCFA",
            automatic_payment_methods:{enabled:true}
        })
    }
    }