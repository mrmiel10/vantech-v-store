"use client";
import React from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import blackShoe from "../../public/blackShoe.jpg";
import { ChevronDown, Filter } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { SquareSlashIcon } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import Filters from "../mobileFiltersDialog/Filteres";
import SortOptionsFilters from "../SortOptionsFilters";
import { useState } from "react";

const Mouses = () => {
       
      const Categories = [
        { name: "desktops", href: "/desktops" },
        { name: "laptops", href: "/laptops" },
        { name: "kit de vidéo surveillance", href: "/kit de vidéo suveillance" },
        //{ name: "mouses", href: "/mouses" },
        { name: "switchs", href: "/switchs" },
        { name: "routeurs", href: "/routeurs" },
      ];
      
     
      const filters = [
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
    //   for(let i = 0; i < 5; i++){
    //     filters[0].options.push({value: "2", label: "40L", checked: true })
    //   }
    //   console.log(filters)
    
      function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
      }
    
      const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    
  return (
    <div className="bg-white">
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Filtres
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                    <FaXmark />
                  </button>
                </div>

                {/* Filters */}
                <Filters filters ={filters} Categories ={Categories}  />
              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-blue-700">
            Souris{" "}
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-700">
                  Classer
                  <ChevronDown
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-700"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* sortOptionFilters*/}
                 <SortOptionsFilters />
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <SquareSlashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <SquareSlashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

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

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className="col-span-3">
              <div className="mx-auto grid grid-cols-1 max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-2 lg:max-5xl  xl:grid-cols-3 gap-16 min-h-[400px]">
                <div className="flex flex-col">
                  <a href={`/product/${1}`} className="cursor-pointer">
                    {" "}
                    <div className="hover:scale-105 transition grow flex h-[400px] lg:h-[300px]">
                      <Image
                        className="hover:opacity-60 rounded-xl object-cover w-full"
                        src={blackShoe}
                        alt=""
                      />
                    </div>
                  </a>

                  <div className="flex flex-col space-y-2 justify-center text-center px-3 py-4">
                    
                      <p>Easy baskets</p>
                      <p className="text-center text-gray-500">
                      <span>16</span> avis
                    </p>
                    <p className="italic text-gray-500 text-center">
                      En stock:
                    </p>
                      <p className="text-blue-700 font-semibold">$50</p>
                    
                    
                   
                  </div>
                </div>
                <div className="flex flex-col">
                  <a href="#" className="cursor-pointer">
                    <div className="hover:scale-105 transition grow flex h-[400px] lg:h-[300px]">
                      <Image
                        className="hover:opacity-60 rounded-xl object-cover w-full"
                        src={blackShoe}
                        alt=""
                      />
                    </div>
                  </a>

                  <div className="flex flex-col px-3 py-4">
                    <div className="flex justify-between mb-4 font-bold">
                      <p>Brown Nike</p>
                      <p>$30</p>
                    </div>
                    <p className="italic text-gray-500">5 sizes available</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <a href="#" className="cursor-pointer">
                    <div className=" h-[400px] lg:h-[300px] grow flex">
                      <Image
                        className="hover:opacity-60 rounded-xl object-cover w-full"
                        src={blackShoe}
                        alt=""
                      />
                    </div>
                  </a>

                  <div className="flex flex-col px-3 py-4">
                    <div className="flex justify-between mb-4 font-bold">
                      <p>Brown Nike</p>
                      <p>$30</p>
                    </div>
                    <p className="italic text-gray-500">5 sizes available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  )
}

export default Mouses