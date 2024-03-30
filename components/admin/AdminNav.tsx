"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { ShoppingCart } from "lucide-react";
import vStore from "../../public/vStore.png";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";
import { Order,User } from "@prisma/client";
import { ChevronDown } from "lucide-react";
const AdminNav = ({
  path,
  User,
 
}: {
  path?: string,
  User:(User & {
    orders: Order[];
  }) | null|undefined;
 
}) => { 
  const {cartTotalQty} = useCart() 
 
    const links = [
        { href: "/", content: "Accueil" },
        { href: "/admin", content: "Statistiques" },
        { href: "/admin/add-products", content: "Ajouter les articles" },
        { href: "/admin/manage-products", content: "Gérer les articles" },
        { href: "/admin/manage-orders", content: "Gérer les commandes" },
        { href: "", content: "Tous les catégories"},
       
      ];
      const Categories = [
        { href: "/desktops", content: "Desktops" },
        { href: "/laptops", content: "Laptops" },
        { href: "/kv surveillance", content: "Kit vidéo surveillance" },
        { href: "/routeurs", content: "Routeurs" },
        { href: "/mouses", content: "Souris" },
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
  const settingsUser = "text-white lg:px-4 px-0 py-2 lg:text-blue-700 lg:group-hover/settingsAcc:hover:bg-gray-200  ease-in duration"

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
                           <ul className="p-0">
                      <li className={`${settingsUser} font-bold`}>{User?.email}</li>
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
                           <li className={`${settingsUser}`}>Ton dashboard ADMIN</li>
                         </Link>
                      )
                      }
                     
                      <Link
                        href="/api/auth/logout"
                        className="cursor-pointer group/settingsAcc"
                      >
                        <li className={`${settingsUser}`}>Se déconnecter</li>
                      </Link>
                    </ul>
                  </div>
                  {/* End profile,settings,sign Out */}
                </div>
              )}
                  <div
              onClick={() => {Router.push("/Cart")}}
              className="relative flex flex-col  w-fit cursor-pointer">
                <ShoppingCart className="text-white mr-4" size={40} />
                <span className="absolute flex justify-center items-center text-white text-sm right-1 -top-1 w-6 h-6 rounded-full bg-orange-500 ">
                 {cartTotalQty}
                </span>
              </div>
            

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
              if(link.href === "") {
                return (
                  <Menu
                  key={index}
                  as="div"
                  className="relative px-4 py-2 inline-block text-left lg:flex  justify-center items-center"
                >
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-white">
                      Tous les Catégories
                      <ChevronDown
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
        
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-full lg:w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {Categories.map((option, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                }text-gray-500 hover:bg-orange-500 block px-4 py-2 text-sm`}
                              >
                                {option.content}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                )
              }
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
