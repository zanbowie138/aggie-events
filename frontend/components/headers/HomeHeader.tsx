import React from "react";
import HeaderContent from "./HeaderContent";

export default function HomeHeader() {
  return (
    <>
      <header className="dark:bg-gray-950 bg-transparent h-[120px] relative flex items-start text-black">
        <HeaderContent />
      </header>
    </>
  );
}
