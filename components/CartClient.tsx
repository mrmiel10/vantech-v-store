"use client";
import React from "react";
import { useCart } from "../hooks/useCart";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/lib/formatPrice";
import { User,Order } from "@prisma/client";


const CartClient = ({  User
} : {  User:(User & {
  orders: Order[];
}) | null|undefined; }) => {
  const Router = useRouter();
  const { cartProducts,handleClearCart,cartTotalAmount } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="text-gray-500 flex flex-col space-y-2">
        <ShoppingCartIcon size={250} className="text-blue-950" />
        <p className="text-center">Votre panier est vide</p>
        <Link
          href={"/"}
          className="transition hover:text-blue-700 cursor-pointer justify-center inline-flex "
        >
          <ArrowLeft />
          <span>Poursuivre les achats</span>
        </Link>
      </div>
    );
  }
  return (
    <div className=" max-w-[700px] w-[600px]">
         {cartProducts.map((item)=>{
            return <ItemContent key={item.id} item={item}  />
         })}
         <div
         onClick={() => handleClearCart()}
          className="pb-4"><Button className="w-full rounded-log text-orange-500 bg-ranparent hover:bg-transparent border-2 border-orange-500">Vider le panier</Button></div>
           <div>
           <div className="text-gray-500">
        <p className="flex justify-between">
          <span>Prix Total</span>
          <span className="font-semibold text-orange-500">{formatPrice(cartTotalAmount)}</span>
        </p>
      </div>
    

        {!User ? (
          <Button
           
          onClick={()=>{Router.push('/checkout')}}
      
            className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Commander
          </Button>
        ) : (
          <Button
          onClick={()=>{Router.push('/api/auth/login')}}
           
            className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Connecter vous afin de passer la commande
          </Button>
        )}

        <Link
          href={"/"}
          className="transition text-gray-500 hover:text-blue-700 cursor-pointer justify-center inline-flex "
        >
          <ArrowLeft />
          <span >Poursuivre les achats</span>
        </Link>
      </div>
    
    </div>
  );
};

export default CartClient;
