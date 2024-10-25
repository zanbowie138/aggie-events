import React from 'react'
import Image from 'next/image'
import AnimText from '@/components/typing_animation/AnimText'
import { TypingText } from '@/config/config'

export default function Homepage() {
    return (<>
        <div className="relative w-full h-[400px]">
            <div className="p-5 md:pl-14 md:pt-14">
                <div className="mb-4 w-full">
                    <AnimText texts={TypingText} delay={0} />
                </div>
                <div className="w-fit">
                    <hr></hr>
                    <h2 className="text-white mt-2 text-xl">One stop shop for events and organizations happening on campus</h2>
                </div>
            </div>

            <div className="absolute bottom-5 w-full">
                <div className="flex justify-evenly">
                    <button className="bg-maroon text-white px-7 py-2 
                    rounded-lg mt-4 shadow-md hover:shadow-lg text-xl border-2 border-black">Find Events</button>
                    <button className="bg-maroon text-white px-4 py-2
                     rounded-lg mt-4 shadow-md hover:shadow-lg text-xl border-2 border-black">Register Your Club</button>
                </div>
            </div>

            {/* Background image and color filter */}
            <Image
                src="/tamu_campus.jpg"
                quality={100}
                fill={true}
                // placeholder='blur'
                alt="TAMU Campus"
                className="-z-10 object-cover"
                priority={true}
            />
            <div className="absolute bg-maroon/50 w-full h-full -z-[9] top-0 left-0" />
        </div>

        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
        <h1 className="text-3xl">Aggie Events Homepage!</h1>
    </>)
}