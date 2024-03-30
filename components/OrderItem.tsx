"use client";
import Image from "next/image";
import { CartProductType } from "@prisma/client";
import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/formatPrice";
interface OrderItemProps {
  item: CartProductType;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[200px] aspect-square">
          <Image fill src={item.selectedImg.image} alt={item.name} />
        </div>
        <div className="flex flex-col gap-1">
            <div>{truncateText(item.name)}</div>
            <div>{item.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-end">{item.quantity}</div>
      <div className="justify-self-end font-semibold">{((item.price * item.quantity).toFixed(2))}</div>
    </div>
  );
};
export default OrderItem