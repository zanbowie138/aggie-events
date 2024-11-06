'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Links } from "@/config/config";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
    document.getElementById("search-input")?.setAttribute("value", queryParam!);
  }, []);

  return (
    <header className="dark:bg-gray-950 bg-lightmaroon border-b-[1px] border-b-gray-300 dark:border-b-white flex">
      <nav className="flex items-center mx-5 w-full text-white dark:text-white">
        {/* Logo section */}
        <div className="mb-2">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="logo"
              width={50}
              height={50}
              className="mb-2 mt-1"
            />
            <div className="text-xl font-bold italic leading-none w-10 mt-2">
              Aggie Events
            </div>
          </a>
        </div>

        {/* Search section */}
        // TODO: move search section into its own component
        <form className="flex grow justify-center hover:drop-shadow-lg">
          <input
            id="search-input"
            alt="Test"
            className="text-black bg-gray-100 rounded-l-md px-2 py-1 max-w-[700px]
            w-full h-10 outline-none
            focus:border-[#202020] focus:border-y-2 focus:border-l-2 peer"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                router.push(`/search?query=${query}`); // TODO: should I make it not remove all the search params when a new main search term is entered
                window.dispatchEvent(new Event('popstate'));
              }
            }}
          />
          <button
            className="bg-maroon rounded-r-md py-2 px-3
          peer-focus:border-[#202020] peer-focus:border-y-2 peer-focus:border-r-2"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/search?query=${query}`)
              window.dispatchEvent(new Event('popstate')); // TODO: abstract these two commands into a function
              // TODO: fix this to update the tags on the first popstate
            }}

          >
            <FaSearch color="white" />
          </button>
        </form>

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
          {/*<Link href="/login" className="">*/}
          {/*  Sign in*/}
          {/*</Link>*/}
          <Image
            src="/cat.webp"
            alt="user"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-maroon-500 hover:ring-[3px] cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
}
