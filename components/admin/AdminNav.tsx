"use client";
import React, { useState } from "react";
import tailwind from "../public/tailwind.png";
import Me from "../public/Me.jpg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import vStore from "../../public/vStore.png";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";
import { Order,User } from "@prisma/client";
const AdminNav = ({
  path,
  User,
 
}: {
  path?: string,
  User:(User & {
    orders: Order[];
  }) | null|undefined;
 
}) => {  
 
    const links = [
        { href: "/admin", content: "Statistiques" },
        { href: "/admin/add-products", content: "Ajouter les articles" },
        { href: "/admin/manage-products", content: "Gérer les articles" },
        { href: "/admin/manage-orders", content: "Gérer les commandes" },
       
      ];
  const Router = useRouter()
 
 
  const [isToggleNavbar, setToggleNavbar] = useState<boolean>(true);
  const changeIcon = () => {
    setToggleNavbar(!isToggleNavbar);
    console.log(isToggleNavbar);
  };
  const [istoggleParamsUser, setToggleParamsUser] = useState<boolean>(true);
  const toggleParamsUser = () => {
    setToggleParamsUser(!istoggleParamsUser);
  };
  const settingsUser = "text-white lg:text-gray-200 lg:group-hover/settingsAcc:hover:bg-gray-400 ease-in duration"
   

  return (
    <div className="flex flex-col">
      <nav className="flex flex-col bg-blue-950 py-4">
        <div className="px-4 flex flex-col  justify-between items-center gap-x-2 lg:flex-row">
          {/* logo,inputSearch,etc. */}
          <div className="flex flex-col lg:flex-row w-full gap-x-4">
            <div className="flex w-full justify-center lg:justify-start lg:w-[150px] flex-initial">
              {/* <Image src={tailwind} alt="logo tailwind" /> */}
              <Image src={vStore} alt="logo V-Store" width={300} />
            </div>
            <div className="flex flex-row grow justify-center">
              <div className="grow text-center flex justify-center items-center">
            
                <div className="flex ">
                  <input
                    type="text"
                    className="px-8 focus:ring-0 border-0 ring-red-500 outline-none w-[1%] flex-auto rounded-tl-md rounded-bl-md"
                  />
                  <button
                    className="bg-blue-700 hover:bg-blue-800 transition-all ease-in duration 100 flex-initial rounded-tr-md rounded-br-md border-l-0 px-8 py-2 text-white border-white border
                    "
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className={`lg:hidden w-[40px] flex justify-center`}>
                <button
                  onClick={changeIcon}
                  className="button-ham border-0 rounded-md focus:ring-2 ring-white w-full inline-flex justify-center items-center"
                >
                  <span className="text-4xl text-white group-toggle-icon">
                    <FaBars
                      className={`${
                        isToggleNavbar ? "hidden" : "block"
                      } icon-bar transition ease-in duration-100 `}
                    />
                    <FaXmark
                      className={`${
                        isToggleNavbar ? "block" : "hidden"
                      } icon-xmark transition ease-in duration-100 `}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* End logo,inputSearch */}

          {/* settingsUser */}
          <div
            className={`${
              isToggleNavbar ? "block" : "hidden"
            }  relative py-4 justify-center lg:p-0 w-full lg:flex flex-col lg:flex-row lg:w-[300px]`}
          >
            <div className="lg:items-center justify-center mt-4 lg:mt-0 flex flex-col lg:flex-row ">
            {User && User.role === "ADMIN" && (
                 <Button className="text-blue-500 hover:opacity-80"
                 onClick={()=>{Router.push('/admin')}}
                 >Passer en mode Admin
                 </Button>
              ) }
              {!User ? (
                <div className="space-x-2 flex mr-4 flex-row">
                  <Link
                    href="/api/auth/login"
                    className="rounded-md text-white px-4 py-2 bg-blue-700 hover:bg-blue-800 transition-all ease-in duration 100"
                  >
                    Sign
                  </Link>
                  <Link
                    href="/api/auth/register"
                    className="rounded-md text-white px-4 py-2 bg-blue-700 hover:bg-blue-800 transition-all ease-in duration 100"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className=" flex flex-col items-stretch">
                  <div className="flex flex-row text-white">
                    <div className=" flex justify-center items-center">
                      <button
                        onClick={toggleParamsUser}
                       
                        className="f rounded-full flex justify-center items-stretch mr-3 w-10 h-10  lg:focus:ring-2 ring-white bg-white"
                      >
                     
                        <Avatar className="rounded-full bg-slate-400 text-white flex justify-center items-center font-bold">
                          <AvatarImage
                            src={User?.picture ?? ""}
                            alt="@shadcn"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-orange-500">
                            {User?.firstName?.[0]} {User?.lastName?.[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </div>
                    <div className="block lg:hidden">
                      <p className="font-bold text-white">
                        {User?.firstName} {User?.lastName}
                      </p>
                      <p>{User?.email}</p>
                    </div>
                  </div>
                  {/* Profile,Settings,Sign out */}
                  <div
                    className={`${
                      !istoggleParamsUser ? "isSlideSettings" : ""
                    } lg:hidden  lg:absolute lg:right-0 lg:top-0 lg:translate-y-12 mt-4 lg:bg-white lg:shadow-md lg:rounded-md lg:py-2 lg:px-2 lg:w-[300px]   div-account`}
                  >
                    <ul className="">
                      <li className={`${settingsUser}`}>{User?.email}</li>
                      <hr className="hidden lg:block lg:text-gray-500 h-1"></hr>
                      <Link
                        href="/Profil"
                        
                        onClick={() => {
                          `${window.location.origin}/Profil`;
                        }}
                        className="cursor-pointer group/settingsAcc"
                      >
                        <li className={`${settingsUser}`}>Mon profil</li>
                      </Link>
                      <Link
                        href="/orders"
                        className="cursor-pointer group/settingsAcc"
                      >
                        <li className={`${settingsUser}`}>Mes achats</li>
                      </Link>
                      {User && User.role === "ADMIN" && (
                           <Link
                           href="/admin"
                           className="cursor-pointer group/settingsAcc"
                         >
                           <li className={`${settingsUser}`}>Ton dashboard</li>
                         </Link>
                      )
                      }
                     
                      <Link
                        href="/api/auth/logout"
                        className="cursor-pointer group/settingsAcc"
                      >
                        <li className="linksSettings">Se déconnecter</li>
                      </Link>
                    </ul>
                  </div>
                  {/* End profile,settings,sign Out */}
                </div>
              )}
            

            </div>
          </div>
          {/* End settingsUser */}
        </div>

        <div
          className={`${
            isToggleNavbar ? "block" : "hidden"
          } line-separate  lg:block lg:px-4 mt-4`}
        >
          <hr className=" w-full  h-3" />
        </div>

        {/* navLinks */}
        <div
          className={`${
            isToggleNavbar ? "block" : "hidden"
          } infos-user px-4 -order-first mt-4 lg:mt-0 lg:block flex-col divide-y-1 divide-white`}
        >
          <ul className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6 text-white">
            {links.map((link,index)=>{
                return(
                    <Link href={link.href} key={index} className="cursor-pointer">
                <li
                  className={`${
                    link.href === path && "bg-blue-900"
                  } px-4 py-2 rounded-md`}
                >
                  {link.content}
                </li>
              </Link>
                )  
            })}
          </ul>
        </div>
        {/* End navLinks */}
      </nav>
    </div>
  );
};
export default AdminNav;
