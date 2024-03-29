"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import {Elements} from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm'
import { Button } from '@mui/material'
const CheckoutClient = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  const {cartProducts,paymentIntent,handleSetPaymentIntent} = useCart()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [clientSecret,setClientSecret] = useState("")
  const[paymentSuccess,setPaymentSuccess] = useState(false)
  const Router = useRouter()
  console.log("paymentIntent",paymentIntent)
  console.log("clientSecret",clientSecret)
  useEffect(()=>{
    if(cartProducts){
        setLoading(true)
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
            setClientSecret(data.paymentIntent.client_secret)
            handleSetPaymentIntent(data.paymentIntent.id)
        }).catch((error)=>{
            console.log(error)
            console.log("erreur de payment")
            setError(true)
            toast.error("une erreur sest produite")
        })
    }
  },[cartProducts,paymentIntent])
  const options: StripeElementsOptions = {
    clientSecret,
    appearance:{
      theme:"stripe",
      labels:"floating"
    }
  }
  const handleSetPaymentSuccess = useCallback((value:boolean)=>{
    setPaymentSuccess(value);

  },[])

    return (
    <div className='w-full'>
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret}
          handleSetPayementSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className='text-center'>Loading Checkout...</div>}
      {error && <div className='text-center text-rose-500'>Une erreur s&apos;est produite</div>}
        {paymentSuccess && (
          <div className='flex items-center flex-col gap-4'>
            <div className='text-teal-500 text-center'>Payment reussi</div>
            <div className='max-w-[220px] w-full'>
              <Button
              className='text-blue-700'
              onClick={()=>Router.push("/orders")}
              >
                Visualiser vos achats
              </Button>
            </div>
          </div>
        )}
    </div>
  )
}

export default CheckoutClient