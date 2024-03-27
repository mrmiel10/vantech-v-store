"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import nikeShoe from "../public/blackNike.jpg";
import redShoe from "../public/redShoe.jpg";
import logoTailwind from "../public/tailwind.png";
import { ArrowLeft } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const CartShopping = () => {
  //console.log(authentificate);
  const Router = useRouter();
  
  return (
    
      
      <div className=" max-w-[600px]">
        
        <div className="divide-y-2 divide-gray-200 section-articles flex flex-col">
          <div className="div-articles flex gap-x-4 py-4">
            <div className="flex basis-[50%] h-[150px] f600:h-[200px] img-article bg-white">
              <Image
                className="rounded-lg w-full object-cover"
                src={redShoe}
                alt="redShoe"
              />
            </div>
            <div className="detail-article basis-[50%] flex flex-col justify-between">
              <div>
                <p>Micro Backpack</p>
                <p>$70.00</p>
                <p>Moss</p>
                <p>5L</p>
              </div>
              <div className="text-blue-600 flex justify-between">
                <span className="cursor-pointer">Retirer</span>
                <div className="flex space-x-4 items-center">
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
                </div>
              </div>
            </div>
          </div>

          <div className="py-4">
            <p className="flex justify-between">
              <span>Total</span>
              <span>$341.68</span>
            </p>
          </div>
          <div>
            {authentificate ? (
              <Button
               
                className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Payer
              </Button>
            ) : (
              <Button
               
                className="mb-2 w-full flex flex-col justify-center items-center bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Connecter vous pour payer
              </Button>
            )}

            <p
              onClick={() => {
                Router.push("/");
              }}
              className="cursor-pointe flex"
            >
              <ArrowLeft className="mr-2" />
              Poursuivre les achats
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>

      
       
      
    
  );
};
export default CartShopping;
