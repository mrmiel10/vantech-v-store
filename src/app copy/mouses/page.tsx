import React from "react";
import Image from "next/image";

import NavbarProfile from "../../../components/NavbarProfile";
import Footer from "../../../components/Footer";
import prisma from "../../../db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Header from "../../../components/Header";
import GetMouses from "../../../components/GetMouses";
import FilterAllProducts from "../../../components/mobileFiltersDialog/FilterAllProducts";
import MenuFilter from "../../../components/mobileFiltersDialog/MenuFilter";
import ProductCard from "../../../components/ProductCard";
import getProducts from "../../../actions/getProducts";

const Page = async () => { 
  
 const productsAll = await getProducts({category:"Souris"})
 if(productsAll.length === 0 ) return null


  let authentificated = false;
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  let userInfo = null;
  let userData = null;

  if (user) {
    try {
      userInfo = await prisma.user.findUnique({
        where: { kindeId: user?.id },
     });
    } catch (error) {
      authentificated = false
    }
  
    if (userInfo || userInfo != null) {
      authentificated = true;
      userData = {
        id: userInfo?.id,
        kindeId: user.id,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        picture: userInfo.picture,
      };
    } else authentificated = false;
  } else authentificated = false;

  console.log(authentificated);
  console.log(user);
  console.log(userInfo);
  const Categories = [
    { name: "laptops", href: "/laptops" },
    { name: "desktops", href: "/desktops" },
      { name: "kit de vidéo surveillance", href: "/kit de vidéo suveillance" },
      { name: "mouses", href: "/mouses" },
      { name: "switchs", href: "/switchs" },
      { name: "routeurs", href: "/routeurs" },
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
        { value: "HP", label: "HP", checked: true },
        { value: "RAZER", label: "RAZER", checked: false },
        { value: "LENOVO", label: "RAZER", checked: false },
        { value: "lOGITECH", label: "LOGITECH", checked: false },
       
      ],
    },
    {
      id: "Connectivité",
      name: "Connectivité",
      options: [
        { value: "Fil", label: "Fil", checked: true },
        { value: "USB", label: "USB", checked: false },
        { value: "Bluetooth", label: "Bluetooth", checked: false },
       
      ],
    },
   
  ];

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <NavbarProfile
        
        authentificate={authentificated}
        User={userData}
      />
      <main className="grow">
        <Header />
       <GetMouses />
        
       <div >
      <div>
        {/* Mobile filter dialog */}
  <FilterAllProducts Categories = {Categories} Filters={Filters} />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <MenuFilter sortOptions={sortOptions} name="Souris" />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {Categories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

              </form>

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
