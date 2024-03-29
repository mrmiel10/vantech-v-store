"use client"
import { Product } from '@prisma/client'
import { formatPrice } from '@/lib/formatPrice'
import React, { useCallback } from 'react'
import { product } from '../../../../components/product'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import Heading from '../../../../components/Heading'
import { truncateText } from '@/lib/truncateText'
import Status from '../../../../components/Status'
import { MdCached, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ActionBtn from '../../../../components/ActionBtn'
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { deleteProduct } from '@/lib/actions'
import firebaseApp from '@/lib/firebase'
interface ManageProductsClientProps{
    products:Product[]
}
const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {
  const Router = useRouter()
  const storage = getStorage(firebaseApp)
  let rows:any  = []
  if(product){
    rows = products.map((product)=>{
        return {
            id:product.id,
            name:truncateText(product.name),
            price:formatPrice(product.price),
            category:product.category,
            brand:product.brand,
            inStock:product.inStock,
            images:product.image
        }
    })
    console.log(rows)
  }
  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID' ,width:220},
    {field: 'name', headerName: 'Nom' ,width:240},   
    {field: 'price', headerName: 'Prix(FCFA)' ,width:100,
    renderCell:(params)=>{
    return (<div className='font-bold text-slate-800'>{params.row.price}</div>)
  },},
  {field: 'category', headerName: 'Categorie' ,width:100} ,
  {field: 'brand', headerName: 'Marque' ,width:100}, 
  {field: 'inStock', headerName: 'En Stock' ,width:120,
renderCell:(params)=>{
  return (
    <div>{params.row.inStock === true ? (
      <Status
      text='En stock'
      icon={MdDone}
      bg="bg-teal-200"
      color='text-teal-700'
      />
    )
  :(
    <Status
      text='Hors stock'
      icon={IoMdClose}
      bg="bg-rose-200"
      color='text-rose-700'
      />
  )}
    </div>
  )
}} ,
{
  field:"action",
  headerName:"Actions",
  width:200,
  renderCell:(params) =>{
    return <div className='flex justify-between gap-4 w-full'>
      <ActionBtn icon={MdCached} onClick={() =>{
        handleToggleImageStock(params.row.id,params.row.inStock)
      }} />
      <ActionBtn icon={MdDelete} onClick={() =>{handleDelete(params.row.id,params.row.images)}} />
      <ActionBtn icon={MdRemoveRedEye} onClick={() =>{Router.push(`/product/${params.row.id}`)}} />
      
      </div>
  }
}

  ]
  const handleToggleImageStock = useCallback((id:string,inStock:boolean)=>{
    axios.put("/api/product",{
      id,
      inStock : !inStock
    }).then((res)=>{
      toast.success("le statut du produit a bien été changé")
      Router.refresh()
    }).catch((err)=>{
      toast.error("Impossible de mettre à jour le statut de cet article")
      console.log(err)
    })
  },[])
  const handleDelete = useCallback(async(id:string,images:any[])=>{
    toast("Le produit est entrain d'être supprimé...")
    const handleImageDelete = async()=>{
      try {
        for(const item of images){
          if(item.image){
            const imageRef = ref(storage,item.image)
            await deleteObject(imageRef)
            console.log("image supprimée",item.image)
          
          }
        }
      } catch (error) {
        return console.log("Erreur lors de la suppression d'images associées au produit",error)
      }
    }
    await handleImageDelete()
    try {
      const productDelete = await deleteProduct(id)
      toast.success("votre produit a bien été supprimé")
      Router.refresh()
     
    } catch (error) {
      toast.error('Impossible de supprimer le produit')
      console.log(error)
    }
    
  },[storage])
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

export default ManageProductsClient