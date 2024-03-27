"use client"
import React from 'react'
import ButtonOpenFilter from './ButtonOpenFilter';
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "lucide-react";
import { SquareSlashIcon } from "lucide-react";
import { FaXmark } from "react-icons/fa6";

export interface MenuFilterProps{
    name:string,
    sortOptions: {
        name: string;
        href: string;
        current: boolean;
    }[]



}
const MenuFilter= (params:MenuFilterProps) => {
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
      }
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
    <h1 className="text-4xl font-bold tracking-tight text-blue-700">
    {params.name}
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
              {params.sortOptions.map((option) => (
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
      {/*button open filter */}
     <ButtonOpenFilter />
    </div>
  </div>
  )
}

export default MenuFilter