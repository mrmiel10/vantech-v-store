"use client";
import React from "react";
import { CartProductType } from "./ProductDetails";
import { Button } from "@mui/material";
import Image from "next/image";
import { Plus } from "lucide-react";
import { MinusIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import SetQuantity from "./products/SetQuantity";
import { useCart } from "../hooks/useCart";
interface ItemContentProps {
  item: CartProductType;
 
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {handleRemoveProductFromCart,handleCartQtyIncrease,handleCartQtyDecrease} = useCart()
    return (
    <div className="text-gray-500 divide-y-2 divide-gray-200 section-articles flex flex-col">
      <div className="div-articles flex gap-x-4 py-4">
        <Link href={`/product/${item.id}`} className=" cursor-pointer basis-[50%]">
        <div className="relative border-2 rounded-md aspect-square flex  img-article bg-white">
          <Image
          
           fill
            className="rounded-lg w-full object-contain"
            src={item.selectedImg.image}
            alt={item.name}
          />
        </div>
        </Link>
        <div className="detail-article basis-[50%] flex flex-col justify-between">
          <div>
            <p>{item.name}</p>
            <p>{item.selectedImg.color}</p>
            <p className="font-semibold">{formatPrice(item.price)}</p>
           
          </div>
          <div className=" flex justify-between">
            <span
            onClick={() => handleRemoveProductFromCart(item)}       
            className="cursor-pointer font-semibold hover:underline">Retirer</span>
            <SetQuantity 
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() =>{handleCartQtyIncrease(item)}}
            handleQtyDecrease={()=> {handleCartQtyDecrease(item)}}
            />
            {/* <div className="flex space-x-4 items-center">
              {" "}
              <Plus
                className=" border
             rounded-md border-blue-700"
              />
              <span>1</span>
              <Plus
                className=" border
             rounded-md border-blue-700"
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="py-4">
        <p className="flex justify-between items-center">
          <span >Total</span>
          <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
        </p>
      </div>
    
    </div>
  );
};

export default ItemContent;
