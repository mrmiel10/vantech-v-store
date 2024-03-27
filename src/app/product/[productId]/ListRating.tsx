"use client";
import React from "react";
import Heading from "../../../../components/Heading";
import { products } from "../../../../components/products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Rating } from "@mui/material";
import { Order, Product, Review, User } from "@prisma/client";

interface ListRatingProps {
  product:Product & {
    reviews: Review[];
  };
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if(product.reviews.length === 0) return null
  return (
    <div>
      <Heading title="Commentaire sur l'article " />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review:any, index:number) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar className="text-7xl text-orange-500 rounded-full w-8 h-8 bg-gray-200 shadow-lg font-bold flex justify-center items-center">
                      <AvatarImage
                        src={review.user.image}
                        alt={review.user.name}
                        className="object-cover"
                      />
                      {/* <AvatarFallback>
            <span>{User?.firstName?.[0].toUpperCase()} {User?.lastName?.[0]}</span>
          </AvatarFallback> */}
                    </Avatar>
                  </div>
                  <div>{review.user.name}</div>
                  <div>{moment(review.createdDate).fromNow()}</div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="mt-4 mb-4 " />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
