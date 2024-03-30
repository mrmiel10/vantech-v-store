"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../../hooks/useCart";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/lib/formatPrice";
import toast from "react-hot-toast";
import Heading from "../../../components/Heading";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
interface CheckoutFormProps {
  clientSecret: string;
  handleSetPayementSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPayementSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);
  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPayementSuccess(false);
  }, [stripe]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout reussi");
          handleClearCart();
          handleSetPayementSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading
          title="Entrer vos informations pour finaliser le payment"
          atr=" text-blue-700"
          center
        />
      </div>
      <h2 className="font-semibold mt-4 mb-2 text-orange-500">
        Informations sur l&apos; adresse
      </h2>
      <AddressElement options={{ mode: "shipping" }} />
      <h2 className="font-semibold mt-4 mb-2 text-orange-500">Informations pour le paiement</h2>
      <PaymentElement id="payment-elment" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <div>      
      </div>
      <div className="flex justify-center">
      <Button className="px-8 inlineflex justify-center items-center" disabled={isLoading || !stripe || !elements} onClick={() => {}}>
      {isLoading && (
          <Loader2 className="animate-spin text-white" />
        )}
        Payer
        {/* {isLoading ? "En cours" : "Payer"} */}
      </Button>
      </div>
     
    </form>
  );
};

export default CheckoutForm;
