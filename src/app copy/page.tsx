
import Head from "next/head";
import Image from "next/image";
import NavbarProfile from "../../components/NavbarProfile";
import prisma from "../../db";
import GetAll from "../../components/GetAll";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { SquareSlashIcon } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import AllProducts from "../../components/allProducts";
import getProducts from "../../actions/getProducts";
import FilterAllProducts from "../../components/mobileFiltersDialog/FilterAllProducts";
import ButtonOpenFilter from "../../components/mobileFiltersDialog/ButtonOpenFilter";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import MenuFilter from "../../components/mobileFiltersDialog/MenuFilter";
//import { products } from "./products";
export default async function Home() {  
let authentificated = false 
 const { isAuthenticated, getUser } = getKindeServerSession();
 const user = await getUser();
 let userInfo = null;
 let userData = null;

 const productsAll = await getProducts({category:null})
 if(!productsAll || productsAll.length === 0 ) return <p>Vous n&apos;etes pas connecté</p>


if(user){
  try {
    userInfo = await prisma.user.findUnique({
      where: { kindeId: user?.id },
   });
  } catch (error) {
    authentificated = false
  }

 if(userInfo || userInfo != null){
  authentificated = true
  userData = {
    id: userInfo?.id,
    kindeId: user.id,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
   picture:userInfo.picture
  }
 } else authentificated = false
}
else authentificated = false

console.log(authentificated)
console.log(user)
console.log(userInfo)

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Plus d'étoiles", href: "#", current: false },
  { name: "Nouveau", href: "#", current: false },
  { name: "Prix: plus petit au plus grand", href: "#", current: false },
  { name: "Prix: plus grand au plus petit", href: "#", current: false },
];
const Categories = [
  { name: "laptops", href: "/laptops" },
  { name: "desktops", href: "/desktops" },
    { name: "kit de vidéo surveillance", href: "/kit de vidéo suveillance" },
    { name: "mouses", href: "/mouses" },
    { name: "switchs", href: "/switchs" },
    { name: "routeurs", href: "/routeurs" },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <NavbarProfile path={"/"} authentificate = {authentificated} User = {userData} />
        <main className="grow">
     <header className="px-8 min-h-28 flex justify-center items-center text-blue-700 text-xl lg:text-2xl">
      <p className="flex flex-col f400:flex-row text-center text-2xl">Obtenez votre Toolkit à porter dun clic</p>
    </header> 
     <hr className="mx-14 border-2 border-orange-500 mb-4"/>
    
   <GetAll  />
   <div >
      <div>
        {/* Mobile filter dialog */}
  <FilterAllProducts Categories = {Categories} />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         <MenuFilter sortOptions={sortOptions} name="Tous nos produits" />

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
    </>
  );
}

