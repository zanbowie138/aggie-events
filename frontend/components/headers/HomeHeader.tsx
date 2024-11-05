import React from 'react';
import Image from 'next/image';
import { Links } from '@/config/config';

export default function HomeHeader() {
    return (
        <header className="fixed top-0 left-0 w-full bg-transparent h-[150px] flex items-start justify-between px-6 pt-4 z-10">
            {/* Logo section aligned to the left */}
            <div className="flex items-center justify-start">
                <a href='/'>
                    <Image src="/logo2.png" alt="logo" width={70} height={70} />
                </a>
            </div>

            {/* Navigation section aligned to the right */}
            <nav className="flex items-center ml-auto">
                <ul className="flex gap-x-8">
                    {Links.map(({ href, label }, index) => (
                        <li key={index}>
                            <a
                                href={href}
                                className="text-lg text-white font-cormorant transition-transform duration-300 hover:scale-110 hover:text-gray-300"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User section placeholder */}
            <div>
                {/* <button className="bg-slate-700 text-white px-4 py-2 rounded-lg">
                    <a href='/login'>Login</a>
                </button> */}
            </div>
        </header>
    );
}
