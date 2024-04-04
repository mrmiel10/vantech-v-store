"use client";
import { Order, Product, User } from "@prisma/client";
import { formatPrice } from "@/lib/formatPrice";
import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "../../../components/Heading";
import Status from "../../../components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "../../../components/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  // user: User;
};
const OrdersClient: React.FC<OrdersClientProps> = ({ orders }) => {
  const Router = useRouter();

  let rows: any = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        // customer:`${order.user.firstName}${ order.user.lastName}`,
        amount: formatPrice(order.amount),
        paymentStatus: order.status,
        date: moment(order.createdDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
    console.log(rows);
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    // {field: 'customer', headerName: 'Nom du Client' ,width:240},
    {
      field: "amount",
      headerName: "Total(FCFA)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },

    {
      field: "paymentStatus",
      headerName: "Statut du payment",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="flex justify-center">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "completed" ? (
              <Status
                text="completed"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },

    {
      field: "deliveyrStatus",
      headerName: "Statut en cours",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                Router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-center items-center min-h-[50px]">
        <Heading title="MES COMMANDES" center={true} atr=" text-blue-700 mt-4" />
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default OrdersClient;
