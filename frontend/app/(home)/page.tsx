import React from "react";
import Image from "next/image";
import AnimText from "@/components/typing_animation/AnimText";
import { TypingText, TypingTextBase } from "@/config/config";
import HomeHeader from "@/components/headers/HomeHeader";

export default function Homepage() {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
  <HomeHeader />
  <div className="p-5 md:pl-14 md:pt-14 text-center">
    <div className="cormorant-garamond-bold text-white mt-2 text-xl">
      <AnimText baseText={TypingTextBase} texts={TypingText} delay={0} />
    </div>
    <div className="w-fit pt-5 mx-auto">
      <hr className="w-3/4 mx-auto" />
      <h2 className="cormorant-garamond-light-italic mt-2 text-xl max-w-xs">
      Howdy! Welcome&nbsp;to&nbsp;
        <span 
          style={{ 
            color: '#CE3B4A', 
            textShadow: '0 0 5px rgba(206, 59, 74, 0.8), 0 0 10px rgba(206, 59, 74, 0.6), 0 0 15px rgba(206, 59, 74, 0.4)' 
          }} 
          className="font-bold"
        >
    &nbsp;AggieEvents
    </span>,&nbsp;
        the one stop shop for events and organizations happening on campus!
      </h2>
    </div>
  </div>



        <div className="absolute bottom-5 w-full">
          <div className="flex justify-center gap-x-20 mt-4"> {/* Added margin for spacing */}
            <a
              href="/events"
              className="relative px-4 py-2 text-xl playfair-display-regular text-white transition-transform duration-300 hover:scale-110 hover:text-gray-300"
            >
              FIND EVENTS
              <span className="triangle"></span> {/* Triangle effect */}
            </a>
            <a
              href="/register"
              className="relative px-4 py-2 text-xl playfair-display-regular text-white transition-transform duration-300 hover:scale-110 hover:text-gray-300"
            >
              REGISTER YOUR CLUB
              <span className="triangle"></span> {/* Triangle effect */}
            </a>
          </div>
        </div>

        {/* Background image and color filter */}
        <Image
          src="/tamu_campus.jpg"
          quality={100}
          fill={true}
          alt="TAMU Campus"
          className="-z-10 object-cover"
          priority={true}
        />
        <div className="absolute bg-black/80 w-full h-full -z-[9] top-0 left-0" />
      </div>
    </>
  );
}
