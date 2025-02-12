import React from "react";
import Image from "next/image";
import TypeAnim from "@/app/(home)/components/typing-anim/TypeAnim";
import { TypingText, TypingTextBase } from "@/config/config";
import HomeHeader from "@/components/headers/HomeHeader";
import ParallaxBanner from "@/app/(home)/components/ParallaxBanner";
import EventCard from "@/components/cards/EventCard";

export default function Homepage() {
  return (
    <>
      <ParallaxBanner imgSrc="/tamu_campus.jpg" imgAlt="Image Description">
        <HomeHeader />
        <div className="p-5 md:pl-14 md:pt-14 font-">
          <div className="mb-4 w-full">
            <TypeAnim baseText={TypingTextBase} texts={TypingText} delay={0} />
          </div>
          <div className="w-fit">
            <hr></hr>
            <h2 className="text-white mt-2 text-xl">
              One stop shop for events and organizations in the Texas A&M campus
            </h2>
          </div> 
        </div>

        {/*<div className="absolute bottom-5 w-full">*/}
        {/*  <div className="flex justify-evenly">*/}
        {/*    <button*/}
        {/*      className="bg-lightmaroon text-white px-7 py-2*/}
        {/*            rounded-lg mt-4 shadow-md hover:shadow-lg text-xl border-2 border-black"*/}
        {/*    >*/}
        {/*      Find Events*/}
        {/*    </button>*/}
        {/*    <button*/}
        {/*      className="bg-lightmaroon text-white px-4 py-2*/}
        {/*             rounded-lg mt-4 shadow-md hover:shadow-lg text-xl border-2 border-black"*/}
        {/*    >*/}
        {/*      Register Your Club*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="absolute bg-maroon/50 w-full h-full -z-[20] top-0 left-0" />
      </ParallaxBanner>

      <div className="bg-white text-black px-4 py-8 h-[1000px]"> 
          

        {/*<h1 className="text-3xl font-semibold">Featured Events</h1>*/}
        {/*<div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-4">*/}
        {/*  <EventCard />*/}
        {/*  <EventCard />*/}
        {/*  <EventCard />*/}
        {/*</div>*/}
      </div>
    </>
  );
}
