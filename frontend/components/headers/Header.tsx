"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { HeaderLinks } from "@/config/config";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { useAuth } from "@/components/auth/AuthContext";
import UserMenu from "@/components/headers/UserMenu";
import { AnimatePresence } from "motion/react";

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the menu container

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener when the menu is open
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", () => setShowMenu(false));
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", () => setShowMenu(false));
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", () => setShowMenu(false));
    };
  }, [showMenu]);

  return (
    <>
      <header className="dark:bg-gray-950 bg-lightmaroon flex relative">
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
              {HeaderLinks.map(({ href, label }, index) => (
                <li key={index} className="flex flex-row items-center">
                  <a href={href} className="text-md font-semibold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="inline-flex justify-center w-full py-2 text-sm font-medium text-white"
                >
                  <Image
                    src={user.picture}
                    alt="user"
                    width={35}
                    height={35}
                    className="rounded-full ring-2 ring-maroon-500 hover:ring-[4px] cursor-pointer"
                  />
                </button>
                <AnimatePresence>
                  {showMenu && <UserMenu user={user} logout={logout} />}
                </AnimatePresence>
              </div>
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
    </>
  );
}
