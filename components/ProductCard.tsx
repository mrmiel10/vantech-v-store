"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/formatPrice";
import { Rating } from "@mui/material";

interface ProductCardProps {
  data:any
  
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const Router = useRouter();
  //if(data.reviews){
    const productRating = data.reviews.reduce((acc:any,item:any)=>item.rating + acc,0) / data.reviews.length
  //}
  
  return (
    <div className="flex flex-col border-2 w-[300px]">
     
        {" "}
        <div 
        onClick={() => Router.push(`/product/${data.id}`)}
        className="relative grow p-4 overflow-hidden aspect-square hover:scale-105 transition flex  justify-center w-full h-[200px] cursor-pointer">
          <Image
          fill
            // width={300}
            // height={300}
            className="rounded-xl object-contain w-full"
            src={data.image[0].image}
            alt={""}
          />
        </div>
      {/* </Link> */}

      <div className="text-gray-500 min-h-[50px] bg-slate-100 flex flex-col space-y-2 justify-center text-center px-3 py-4">
        <p className="text-orange-500">{truncateText(data.name)}</p>
        <div className="space-y-2">
          <p>{data.reviews.length} avis</p>
       
   

        <Rating value={productRating} readOnly />
        <p className="text-blue-700 font-semibold">{formatPrice(data.price)}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;
