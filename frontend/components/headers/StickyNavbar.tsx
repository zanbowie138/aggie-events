'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import { Links } from '@/config/config'

export default function Header() {
    const controls = useAnimation();
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) { // Adjust scrollY threshold as needed
                setIsSticky(true);
                
            } else {
                setIsSticky(false);
                // controls.set({ y: 0 });
            }
        }

        if (isSticky) {
            controls.set({ y: -100 });
            controls.start({ y: 0 });
            console.log(isSticky)
            console.log("Sticky")
        } else {
            controls.start({ y: -100 });
            console.log("Not sticky")
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    return (
        <motion.nav
            animate={controls}
            transition = {{ type: 'tween', stiffness: 260, damping: 20 }}
            className={
                `top-0 left-0 w-full z-50 fixed`
            }
        >
            <header className="bg-maroon border-b-4 border-b-black">
                <nav className="flex items-center justify-between w-[92%] mx-auto">
                    {/* Logo section */}
                    <div className="mb-2">
                        <a href='/'>
                            <Image src="/logo2.png" alt="logo" width={75} height={75} />
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
        </motion.nav>
    )
}
