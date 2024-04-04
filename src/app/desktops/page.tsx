import React from "react";
import Image from "next/image";
import { Fragment } from "react";
import Desktops from "../../../components/Categories/Desktops";
import NavbarProfile from "../../../components/NavbarProfile";
import Footer from "../../../components/Footer";
import CarousselHome from "../../../components/CarousselHome";
import prisma from "../../../db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Filteres from "../../../components/mobileFiltersDialog/Filteres";
import GetDesktops from "../../../components/GetDesktops";
import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import FilterAllProducts from "../../../components/mobileFiltersDialog/FilterAllProducts";
import MenuFilter from "../../../components/mobileFiltersDialog/MenuFilter";
import getProducts from "../../../actions/getProducts";
import { getCurrentUser } from "@/lib/actions";
import NoProducts from "../../../components/NoProducts";
const Page = async () => {
  const productsAll = await getProducts({category:"Desktops"})
 if(!productsAll || productsAll.length === 0 ) return <NoProducts text="Impossible d'accéder à la page" />
const user = await getCurrentUser()

const Categories = [
  
  { href: "/laptops", name: "Laptops" },
  { href: "/mouses", name: "Souris" },
  { href: "/cctv", name: "Kit vidéo surveillance" },
   { href: "#", name: "Routeurs" },
   { href: "#", name: "switchs" },
     
];
 
  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Plus d'étoiles", href: "#", current: false },
    { name: "Nouveau", href: "#", current: false },
    { name: "Prix: plus petit au plus grand", href: "#", current: false },
    { name: "Prix: plus grand au plus petit", href: "#", current: false },
  ];
 
  const Filters = [
    {
      id: "marque",
      name: "marque",
      options: [
        { value: "HP", label: "HP", checked: false },
        { value: "DELL", label: "DELL", checked: false },
        // { value: "Lenovo", label: "Lenovo", checked: true },
        
       
      ],
    },
    {
      id: "RAM",
      name: "RAM",
      options: [
        { value: "4Go", label: "4Go", checked: false },
        { value: "8Go", label: "8Go", checked: true },
        { value: "16G0", label: "16Go", checked: false },
       
      ],
    },
    {
      id: "Core du processeur",
      name: "Core du processeur",
      options: [
        { value: "I3", label: "I3", checked: true },
        { value: "I5", label: "I5", checked: false },
       
      ],
    },
    {
      id: "Marque du processeur",
      name: "Marque du processeur",
      options: [
        { value: "Intel", label: "Intel", checked: true },
        { value: "AMD", label: "AMD", checked: false },
       
      ],
    },
    {
      id: "Frequence du processeur",
      name: "Frequence du processeur",
      options: [
        { value: "2.1GHZ", label: "2.1GHZ", checked: true },
        { value: "2.6GHZ", label: "2.6GHZ", checked: false },
        { value: "3.1GHZ", label: "3.1GHZ", checked: false },
        
       
      ],
    },
    {
      id: "Capacité disque dur",
      name: "Capacité disque dur",
      options: [           
        { value: "250Go", label: "250Go", checked: true },
        { value: "256Go", label: "256Go", checked: false },          
        { value: "512Go", label: "512Go", checked: false },
        { value: "2To", label: "2To", checked: false },
       
      ],
    },
    {
      id: "Disque dur",
      name: "Disque dur",
      options: [
        { value: "SSD", label: "SSD", checked: false},
        { value: "HDD", label: "HDD", checked: true },
        
       
      ],
    },
  ];
//   for(let i = 0; i < 5; i++){
//     filters[0].options.push({value: "2", label: "40L", checked: true })
//   }
//   console.log(filters)

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

 


  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <NavbarProfile
        path={"/desktops"}
      
        User={user}
      />
      <main className="grow">
        <Header />
        
       <GetDesktops />
       <div >
      <div>
        {/* Mobile filter dialog */}
  <FilterAllProducts Categories = {Categories} Filters = {Filters} />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <MenuFilter sortOptions={sortOptions} name="Desktops" />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              {/* Filters */}
            
              <Filteres Filters={Filters} Categories={Categories} />
             
              {/* Product grid */}
              <div className="col-span-3">
                <div className="mx-auto grid grid-cols-1 max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-2 lg:max-5xl  xl:grid-cols-3 gap-16 min-h-[400px]">
                  {productsAll.map((product,index) =>{
                    return (
                      <ProductCard key={index} data={product} />
                    )
                  })}
                 
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
