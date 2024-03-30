"use client";

import { Order, User } from "@prisma/client";
import Heading from "../../../../components/Heading";
import { formatPrice } from "@/lib/formatPrice";
import Status from "../../../../components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import OrderItem from "../../../../components/OrderItem";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions";
import OrdersClient from "@/app/orders/OrdersClient";
import OrderUser from "../../../../components/OrderUser";
import axios from "axios";
interface OrderDetailsProps {
  order: Order & {
    user: User;
  };
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const [countOrdersUser, setCountOrdersUSer] = useState<number>(0);
  useEffect(() => {
    fetch("/api/getUser", {
      method: "POST",
      body: JSON.stringify({
        userId: order.userId,
      }),
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data)
        if(data.length > 0) setCountOrdersUSer(data.length)
    })
.catch((error) => {

    console.log(error)
})

},[order.userId,countOrdersUser])
 
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 text-gray-500">
      <div className="mt-8">
        <Heading title="Détails de la commande" atr=" text-blue-700" />
        <hr className="bg-blue-700 max-w-[40%] h-1" />
      </div>
      <div>ID de la commmande:<span className="text-blue-700">{order.id}</span> </div>
      <div>
        Prix Total{"  "}
        <span className="font-bold text-blue-700">{formatPrice(order.amount)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Status du payment:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="complete"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>Status de livraison</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Date: {moment(order.createdDate).fromNow()}</div>
      {/*Liste des produits concernant la commande */}
      <div>
        <h2 className="font-semibold mt-4 mb-2 text-orange-500">Articles commandés</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center justify-items-center text-blue-700">
          <div className="col-span-2 justify-self-start">Article</div>
          <div className=" justify-self-center">Prix</div>
          <div className=" justify-self-center">Quantité</div>
          <div className=" justify-self-center">Total</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />;
          })}
      </div>
      {order.user.role === "ADMIN" ? (
         <div>
         <h2 className="font-semibold mt-4 mb-2 text-orange-500">Informations sur le client</h2>
         <div className="text-blue-500 grid grid-cols-5 text-xs gap-4 pb-2 items-center justify-items-center">
           <div className="col-span-2 justify-self-start">Profil</div>
           <div className=" justify-self-center">Adresse mail</div>
           <div className=" justify-self-center">Rôle</div>
           <div className=" justify-self-center">Achats éffectués</div>
           {/* <div className=" justify-self-center">Total</div> */}
         </div>
         {order.user && (
           <OrderUser user={order.user} countOrdersUser={countOrdersUser} />
         )}
       </div>
      ):(
        <></>
      )}
     
    </div>
  );
};
export default OrderDetails;
