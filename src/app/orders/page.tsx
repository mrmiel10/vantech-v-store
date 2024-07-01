import React, { useState } from "react";
import NavbarProfile from "../../../components/NavbarProfile";
import { getCurrentUser } from "@/lib/actions";
import { getOrdersByUserId } from "@/lib/actions";
import { redirect } from "next/navigation";
import OrdersClient from "./OrdersClient";
import Heading from "../../../components/Heading";
import Footer from "../../../components/Footer";
import order from "../../../public/order.jpg";
import Image from 'next/image'
const page = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  const orders = await getOrdersByUserId(user.id);

  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <NavbarProfile path={""} User={user} />
        <main className="w-full flex flex-col mx-auto items-center grow min-h-[200px] py-8  text-xl">
          {!orders || orders.length === 0 ? (
            <>
              <Image src={order} alt="aucune commande" width={400} />
              <p className="text-blue-900 font-semibold">
                Aucune commande effectuée pour l&apos;instant
              </p>
            </>
          ) : (
            <OrdersClient orders={orders} />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default page;
