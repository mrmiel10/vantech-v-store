"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import next from "../public/next.svg";
import user from "../public/Me.jpg";
import vStore from "../public/v-store.png";
import {FaBars,FaXmark} from "react-icons/fa6";
import $ from "jquery";


export default function Navbar() {
  const linksNav = [
    { href: "/", content: "Accueil" },
    { href: "/Servic", content: "Services" },
    { href: "/Contact", content: "Nous contacter" },
    { href: "/About", content: "About us" },
  ];
  const navLinks = linksNav.map((link, index) => {
    return (
      <li
        key={index}
        className={` px-4 py-2 flex f1208:justify-center items-center `}
      >
        <Link href={link.href}>{link.content}</Link>
      </li>
    );
  });
  
  const [isToggleNavbar,setToggleNavbar] = useState<boolean>(true)
 
  const changeIcon = () =>{
    setToggleNavbar(!isToggleNavbar)
  }
  
  return (
    <>
      <nav className="bg-white-900 py-4 px-8 shadow-md">
        <div className="flex flex-col f1208:flex-row f1208:items-center justify-between">
          <div className="flex flex-row justify-between items-center">
          <div>
            {/* <Image src={next} alt="logoNext" className="w-40" /> */}
          <Image src={vStore} alt="logo V-Store"/>
          </div>
          <div onClick={changeIcon} className="group-toggle-icon ml-4 f1208:hidden"><FaBars className={`${isToggleNavbar? "block":"hidden"} icon-bar text-4xl transition ease-in duration-100 `} /><FaXmark className={`${isToggleNavbar? "hidden":"block"} icon-xmark text-4xl transition ease-in duration-100 `}/></div>
          
          </div>        
          
         
          <div className={`${isToggleNavbar? "hidden":"block"}  f1208:flex flex-col f1208:flex-row grow mt-4 f1208:mt-0 transition-all ease-in duration-200`}>
          <hr className="h-[5px] mt-4 f1208:hidden"></hr>
             {/*mes liens */}
          <div className="-order-3 flex f1208:justify-center mt-8 f1208:mt-0 ">
            <ul className=" flex flex-col f1208:flex-row space-y-3 f1208:space-y-0 f1208:space-x-3">{navLinks}</ul>
          </div>
          <div className="flex flex-col f1208:flex-row  order-3">
            <div className="flex f1208:mr-4">
              <input
                placeholder="Search"
                className="w-full bg-gray-700 max-w-[200px] f1208:max-w-[300px] px-6 py-4 rounded-md placeholder:text-white border-0 ring-0   focus:bg-white focus:shadow-md "
              />
            </div> 
            <div className="order-first f1208:order-none mb-4 f1208:mb-0 flex items-center justify-between">
              <Link  href="./Account" className="px-4">Se connecter</Link>
              <button className="rounded-full flex items-stretch focus:ring-4 ring-gray-700">
                <Image
                  src={user}
                  alt="Me.account"
                  className="rounded-full w-10 h-10 object-cover"
                />
              </button>
            </div>
          </div>
          </div>
         
         
          
        </div>
      </nav>
    </>
  );
}
