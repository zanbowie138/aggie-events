'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Links } from "@/config/config";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { useAuth } from "@/components/auth/AuthContext";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="dark:bg-gray-950 bg-lightmaroon flex">
      <nav className="flex items-center mx-5 w-full text-white dark:text-white">
        {/* Logo section */}
        <div className="mb-2">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="logo"
              width={50}
              height={50}
              priority={true}
              className="mb-2 mt-1"
            />
            <div className="text-xl font-bold italic leading-none w-10 mt-2">
              Aggie Events
            </div>
          </a>
        </div>

        <SearchBar />

        {/* User section */}
        <div className="flex">
          <ul className="flex gap-x-5 px-5">
            {Links.map(({ href, label }, index) => (
              <li key={index} className="flex flex-row items-center">
                <a href={href} className="text-md font-semibold">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {user ? (
            <Image
              src={user.picture}
              alt="user"
              width={35}
              height={35}
              className="rounded-full ring-2 ring-maroon-500 hover:ring-[4px] cursor-pointer"
            />
          ) : (
            <button className="py-1 px-3 rounded-md border-[1px] border-white">
              <Link
                href={`${process.env.NEXT_PUBLIC_AUTH_URL}/google`}
                className=""
              >
                Sign in
              </Link>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
