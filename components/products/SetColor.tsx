"use client"
import React from "react";
import { SelectedImgType } from "../ProductDetails";
import { CartProductType } from "../ProductDetails";
interface setColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}
const SetColor: React.FC<setColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">Couleur:</span>
        <div className="flex gap-1">
          {images.map((image, index) => {
            return (
              <div
              onClick={()=>handleColorSelect(image)}
                key={index}
                className={`h-7 w-7 rounded-full
             border-orange-500 flex items-center
             justify-center
             ${
               cartProduct.selectedImg.color === image.color
                 ? "border-[1.5px]"
                 : "border-none"
             }
             `}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="
              h-5
              w-5
              rounded-full
              border-[1.2px]
              border-slate-200
              "
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
