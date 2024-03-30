import { Order,Product,User } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import { formatPrice } from '@/lib/formatPrice'
import { formatNumber } from '@/lib/formatNumber'
interface SummaryProps{
    orders:Order[],
    products:Product[],
    users:User[]
}
type SummaryDataType = {
    [key:string]:{
        label:string,
        digit:number
    }
}
const Summary:React.FC<SummaryProps> = ({orders,products,users}) => {
    const [summaryData,setSummaryData] = useState<SummaryDataType>({
        sale:{
            label:'TotalVentes',
            digit:0
        },
        products:{
            label:'Total Articles',
            digit:0
        },
        Orders:{
            label:'Total Commandes',
            digit:0
        },
        paidOrders:{
            label:'TotalCommandes payés',
            digit:0
        },
        unpaidOrders:{
            label:'Total commandes non payés',
            digit:0
        },
        users:{
            label:'Total clients',
            digit:0
        },
    })
    useEffect(()=> {
        setSummaryData((prev) => {
            let tempData = {...prev}
            const totalSale = orders.reduce((acc,item)=> {
                if(item.status === 'complete') {
                    return acc + item.amount;
                }
                else return acc
            },0)
            const paidOrders = orders.filter((order =>{
                return order.status = "complete"
            }))
            const unpaidOrders = orders.filter((order =>{
                return order.status === "pending"
            }))
           tempData.sale.digit = totalSale
           tempData.orders.digit = orders.length
           tempData.paidOrders.digit = paidOrders.length
           tempData.unpaidOrders.digit = unpaidOrders.length
           tempData.users.digit = users.length
            return tempData
        })
    },[orders,products,users])
    const summaryKeys = Object.keys(summaryData)
  return (
    <div className='max-w-[1150px] m-auto'>
        <div className='mb-4 mt-8'>
            <Heading title="Statitisques de VANTECH V-STORE" />

        </div>
        <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto text-blue-900'>
            {
                summaryKeys && summaryKeys.map((key) =>{
                    return <div key={key} className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'>
                        <div className='text-xl md:text-4xl font-bold'>
                            {
                                summaryData[key].label === 'Total Sale' ? 
                                <>
                                {formatPrice(summaryData[key].digit)}
                                </>
                                :
                                <>
                                {formatNumber(summaryData[key].digit)}
                                </>
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                })
            }
        </div>

    </div>
  )
}

export default Summary