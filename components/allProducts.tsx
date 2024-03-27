"use client";
import React from "react";
import Image from "next/image";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { SquareSlashIcon } from "lucide-react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import blackShoe from "../public/blackShoe.jpg";
import { useState } from "react";
import { products } from "./products";
import getProducts from "../actions/getProducts";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {

  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Plus d'étoiles", href: "#", current: false },
    { name: "Nouveau", href: "#", current: false },
    { name: "Prix: plus petit au plus grand", href: "#", current: false },
    { name: "Prix: plus grand au plus petit", href: "#", current: false },
  ];
  const subCategories = [
    { name: "Desktops", href: "#" },
    { name: "Laptops", href: "#" },
    { name: "Kit de vidéo surveillance", href: "#" },
    { name: "Switchs", href: "#" },
    { name: "Routeurs", href: "#" },
  ];

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
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-blue-700">
              Tous nos produits{" "}
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
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-orange-500" : "",
                                active ? "text-white" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
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
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

              </form>

              {/* Product grid */}
              <div className="col-span-3">
                <div className="mx-auto grid grid-cols-1 max-w-sm md:grid-cols-2 md:max-w-4xl lg:grid-cols-2 lg:max-5xl  xl:grid-cols-3 gap-16 min-h-[400px]">
                  {products.map((product,index) =>{
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
  );
};

export default AllProducts;
