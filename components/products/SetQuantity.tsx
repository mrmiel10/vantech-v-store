"use client"
import React from "react";
import { CartProductType } from "../ProductDetails";
import { Plus } from "lucide-react";
import { MinusIcon } from "lucide-react";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantité:</div>}
      <div className="flex space-x-4 items-center">
        {" "}
        <MinusIcon
        onClick={handleQtyDecrease}
          className=" border
                     rounded-md border-blue-700"
        />
        <span>{cartProduct.quantity}</span>
        <Plus
         onClick={handleQtyIncrease}
          className=" border
                     rounded-md border-blue-700"
        />
      </div>
    </div>
  );
};

export default SetQuantity;
