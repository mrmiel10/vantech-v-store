"use client"
import React from 'react'
import vStore from "../public/vStore.png";
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
    const links = [
       
        { href: "/desktops", content: "Desktops" },
        { href: "/laptops", content: "Laptops" },
        { href: "/souris", content: "Souris" },
        { href: "/modem", content: "Modems" },
        { href: "/routeurs", content: "Routeurs" },
      ];
  return (
    <footer className="px-8  py-16 pb-0 bg-blue-950 text-white ">
    <div className="flex flex-col">
        <div className="divide-y-3 divide-gray-500">
            <div className=" flex flex-col lg:flex-row mb-8 gap-4 justify-start lg:gap-32">
                <div>
                    <Image className="w-[150px]" src={vStore} alt="" />
                </div>
                <div className="grow flex flex-col xl:flex-row gap-16">
                    <div className="grow grid grid-cols-2 max-w-sm md:grid-cols-3 md:max-w-5xl gap-x-8 gap-y-16 md:gap-32">
                        <div className="flex flex-col ">
                            <p className="font-bold mb-4 text-orange-500">Catégories</p>
                            <ul className="space-y-5">
                                {links.map((item,index)=>{
                                   return <li key={index} ><Link 
                                   href={item.href}>{item.content}
                                   </Link></li>
                                })}                             

                            </ul>
                            
                            

                        </div>
                        <div className="flex flex-col">
                            <p className=" font-bold mb-4 text-orange-500">Services Clients</p>
                            <ul className="space-y-5">
                                <li>Nous Contacter</li>
                                <li>Tees</li>
                                <li>Retours et échanges</li>
                                <li>FAQS</li>
                                <li>Accessories</li>

                            </ul>
                            
                            

                        </div>
                        <div className="flex flex-col">
                            <p className=" font-bold mb-4 text-orange-500">Customer Service</p>
                            <ul className="space-y-5">
                                <li>Bags</li>
                                <li>Tees</li>
                                <li>Objects</li>
                                <li>Home Goods</li>
                                <li>Accessories</li>

                            </ul>
                            
                            

                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start lg:basis-[35%]">
                        
                            <p className="mb-8 text-orange-500 font-semibold">Sign up for our newsletter</p>
                        <p>The latest deals and savings, sent to your inbox weekly</p>
                        <div className="flex  gap-x-4 items-stretch">
                            <input className="flex-auto w-[1%] rounded-md px-3 py-2 drop-shadow-sm" type="text" />
                            <button className="px-3 py-2 rounded-md md:px-4  bg-blue-800 cursor-pointer  text-white">Sign Up</button>
                        </div>
    
                        
                        
                    </div>
                </div>
                
               
            </div>
            
            
        </div>
        <hr/>
        <div className="text-center min-h-[100px] flex justify-center items-center">&copy; 2024 VANTECH V-STORE, Inc. Tous droits réservés.</div>
        </div>
        
    
</footer>

  )
}

export default Footer