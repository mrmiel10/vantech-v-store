"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const Router = useRouter();
  console.log("paymentIntent", paymentIntent);
  console.log("clientSecret", clientSecret);
  console.log(loading);
  useEffect(() => {
    if (cartProducts?.length === 0) redirect("/");
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return Router.push("/api/auth/login");
          }
          if (res.status === 403) return Router.push("/");
          // console.log(res.json())
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
          setLoading(false);
          Router.refresh()
        })
        .catch((error) => {
          console.log(error);
          console.log("erreur de payment");
          setError(true);
          toast.error("une erreur sest produite");
          /// setLoading(false)
        });
    }
    // else{
    //   Router.back()
    // }
  }, []);
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full max-w-sm shadow-md p-8">
      {clientSecret && cartProducts && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              clientSecret={clientSecret}
              handleSetPayementSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        )}

      {loading && (
        <div className="text-center text-blue-700">
          En attente de la validation de la commande....
        </div>
      )}
      {error && (
        <div className="text-center text-rose-500">
          Une erreur s&apos;est produite
        </div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4 max-w-[400px]  min-h-[100px] ">
          <div className="text-teal-500 text-center">Payment reussi</div>
          <div className="max-w-[220px] w-full">
            <Button
              className="bg-blue-700 text-white rounded-md hover:bg-blue-900"
              onClick={() => Router.push("/orders")}
            >
              Visualiser vos achats
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
