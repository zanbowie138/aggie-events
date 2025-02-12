import React from "react";
import Image from "next/image";

import { HeaderLinks } from "@/config/config";
import SearchBar from "@/components/search/SearchBar";
import UserLogoToggle from "@/components/headers/user-menu/UserLogoToggle";

export default function HeaderContent() {
  return (
    <nav className="flex items-center w-full gap-4">
      {/* Logo section */}
      <div className="mb-2 w-fit mx-5">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/logo/logo2.png"
            alt="logo"
            width={50}
            height={50}
            priority={true}
            className="mb-2 mt-1"
          />
          <div className="text-xl font-bold italic leading-none w-fit mt-2 justify-center flex flex-col">
            <div>Aggie</div>
            <div>Events</div>
          </div>
        </a>
      </div>

      <SearchBar />

      {/* User section */}
      <div className="flex mx-5 gap-5">
        <ul className="flex gap-x-5">
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
  );
}
