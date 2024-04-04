"use client";
import Image from "next/image";
import { CartProductType } from "@prisma/client";
import { truncateText } from "@/lib/truncateText";
import { formatPrice } from "@/lib/formatPrice";
import { User } from "@prisma/client";
interface OrderUserProps {
  user: User;
  countOrdersUser:number
}
const OrderUser: React.FC<OrderUserProps> = ({ user,countOrdersUser }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center place-items-center justify-items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image fill src={user.picture} alt={user.firstName ?? user.lastName ?? "name"} className="rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
        </div>
      </div>
      <div className="justify-self-center">{user.email}</div>
      <div className="justify-self-end">{user.role}</div>
      <div className="justify-self-end font-semibold">{countOrdersUser}</div>
    </div>
  );
};
export default OrderUser