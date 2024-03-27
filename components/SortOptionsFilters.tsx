import React from 'react'
import { Menu } from '@headlessui/react';

const SortOptionsFilters = () => {
    const sortOptions = [
        { name: "Most Popular", href: "#", current: true },
        { name: "Plus d'étoiles", href: "#", current: false },
        { name: "Nouveau", href: "#", current: false },
        { name: "Prix: plus petit au plus grand", href: "#", current: false },
        { name: "Prix: plus grand au plus petit", href: "#", current: false },
      ];
      function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
      }
    
  return (
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
  )
}

export default SortOptionsFilters