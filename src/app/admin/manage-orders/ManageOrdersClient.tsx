"use client"
import { Order, Product, User } from '@prisma/client'
import { formatPrice } from '@/lib/formatPrice'
import React, { useCallback } from 'react'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import Heading from '../../../../components/Heading'
import Status from '../../../../components/Status'
import { MdAccessTimeFilled,MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from '../../../../components/ActionBtn'
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import moment from 'moment'

interface ManageOrdersClientProps{
    orders:ExtendedOrder[]
}
type ExtendedOrder = Order & {
  user:User
}
const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {
  const Router = useRouter()
  
  let rows:any  = []
  if(orders){
    rows = orders.map((order)=>{
        return {
            id:order.id,
            customer:`${order.user.firstName}${ order.user.lastName}`,
            amount:formatPrice(order.amount /100),
            paymentStatus:order.status,
            date:moment(order.createdDate).fromNow(),
            deliveryStatus:order.deliveryStatus,
           
        }
    })
    console.log(rows)
  }
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' ,width:220},
    {field: 'customer', headerName: 'Nom du Client' ,width:240},   
    {field: 'amount', headerName: 'Total(FCFA)' ,width:130,
    renderCell:(params)=>{
    return (<div className='font-bold text-slate-800'>{params.row.price}</div>)
  },},
 
  {field: 'paymentStatus', headerName: 'Statut du payment' ,width:130,
  renderCell:(params)=>{
    return (
      <div>{params.row.paymentStatus === "pending" ? (
        <Status
        text='pending'
        icon={MdAccessTimeFilled}
        bg="bg-slate-200"
        color='text-slate-700'
        />
      )
    : params.row.paymentStatus === 'completed' ? (
      <Status
        text='completed'
        icon={MdDone}
        bg="bg-green-200"
        color='text-green-700'
        />
    ):(
     <></>
    )}
      </div>
    )
  }} ,
  
  {field: 'deliveyrStatus', headerName: 'Statut en cours' ,width:130,
renderCell:(params)=>{
  return (
    <div>{params.row.deliveryStatus === "pending" ? (
      <Status
      text='pending'
      icon={MdAccessTimeFilled}
      bg="bg-slate-200"
      color='text-slate-700'
      />
    )
  : params.row.deliveryStatus === 'dispatched' ? (
    <Status
      text='dispatched'
      icon={MdDeliveryDining}
      bg="bg-purple-200"
      color='text-purple-700'
      />
  ):params.row.deliveryStatus === 'delivered' ?(
    <Status
    text='delivered'
    icon={MdDone}
    bg="bg-green-200"
    color='text-green-700'
    />
  ): <></>}
    </div>
  )
}} ,
{field: 'date', headerName: 'Date' ,width:130}, 
{
  field:"action",
  headerName:"Actions",
  width:200,
  renderCell:(params) =>{
    return <div className='flex justify-between gap-4 w-full'>
      <ActionBtn icon={MdDeliveryDining} onClick={() =>{
        handleDispatch(params.row.id)
      }} />
      <ActionBtn icon={MdDone} onClick={() =>{handleDeliver(params.row.id)}} />
      <ActionBtn icon={MdRemoveRedEye} onClick={() =>{Router.push(`/order/${params.row.id}`)}} />
      
      </div>
  }
}

  ]
  const handleDispatch = useCallback((id:string)=>{
    axios.put("/api/order",{
      id,
    deliveryStatus:'dispatched'
    }).then((res)=>{
      toast.success("le statut du produit a bien été changé")
      Router.refresh()
    }).catch((err)=>{
      toast.error("Impossible de mettre à jour le statut de cet article")
      console.log(err)
    })
  },[])
  
  const handleDeliver = useCallback((id:string)=>{
    axios.put("/api/order",{
      id,
    deliveryStatus:'delivered'
    }).then((res)=>{
      toast.success("le statut du produit a bien été changé")
      Router.refresh()
    }).catch((err)=>{
      toast.error("Impossible de mettre à jour le statut de cet article")
      console.log(err)
    })
  },[])
  
    return (
    <div style={{height:600,width:"100%"}}>
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
  )
}

export default ManageOrdersClient