import React from 'react'
import Image from 'next/image'


import { Links } from '@/config/config'

export default function Header() {
    return (
        <header className="bg-maroon border-b-4 border-b-black flex">
            <nav className="flex items-center justify-between w-[92%] mx-auto">
                {/* Logo section */}
                <div className="mb-2">
                    <a href='/'>
                        <Image src="/logo2.png" alt="logo" width={70} height={70} />
                    </a>
                </div>

                {/* Navigation section */}
                <div className="">
                    <ul className="flex gap-x-[4vw]">
                        {Links.map(({ href, label }, index) => (
                            <li key={index}>
                                <a href={href} className="text-lg text-white">{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User section */}
                <div>
                    {/* <button className="bg-slate-700 text-white px-4 py-2 rounded-lg">
                    <a href='/login'>Login</a>
                </button> */}
                </div>
            </nav>
        </header >
    )
}
