import React from "react";
import Image from "next/image";

import { HeaderLinks } from "@/config/config";
import SearchBar from "@/components/search/SearchBar";
import UserLogoToggle from "@/components/headers/user-menu/UserLogoToggle";

export default function HomeHeader() {
  return (
    <>
      <header className="dark:bg-gray-950 bg-gradient-to-b from-40% from-lightmaroon/90 h-[120px] relative flex items-start">
        <nav className="flex items-center mx-5 w-full text-white dark:text-white">
          {/* Logo section */}
          <div className="mb-2 w-fit">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/logo2.png"
                alt="logo"
                width={50}
                height={50}
                priority={true}
                className="mb-2 mt-1"
              />
              <div className="text-xl font-bold italic leading-none w-fit mt-2 justify-center flex flex-col">
                <div className="">Aggie</div>
                <div className="">Events</div>
              </div>
            </a>
          </div>

          <SearchBar />

          {/* User section */}
          <div className="flex">
            <ul className="flex gap-x-5 px-5">
              {HeaderLinks.map(({ href, label }, index) => (
                <li key={index} className="flex flex-row items-center">
                  <a href={href} className="text-md font-semibold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <UserLogoToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
