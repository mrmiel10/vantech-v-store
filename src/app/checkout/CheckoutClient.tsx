"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const CheckoutClient = () => {
  const {cartProducts,paymentIntent,handleSetPaymentIntent} = useCart()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [clientSecret,setClientSecret] = useState("")
  const Router = useRouter()
  console.log("paymentIntent",paymentIntent)
  console.log("clientSecret",clientSecret)
  useEffect(()=>{
    if(cartProducts){
        setLoading(false)
        setError(false)
         fetch('/api/create-payment-intent',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                items:cartProducts,
                payment_intent_id:paymentIntent
                
            })
        }).then((res)=>{
            setLoading(false)
            if(res.status === 401){
                return Router.push('/api/auth/login')
            }
           // console.log(res.json())
             return res.json()
        }).then((data)=>{
            console.log(data)
            //setClientSecret(data.paymentIntent.client_secret)
            //handleSetPaymentIntent(data.paymentIntent.id)
        }).catch((error)=>{
            console.log(error)
            console.log("erreur de payment")
            setError(true)
            toast.error("une erreur sest produite")
        })
    }
  },[cartProducts,paymentIntent])

    return (
    <div>CheckoutClient</div>
  )
}

export default CheckoutClient