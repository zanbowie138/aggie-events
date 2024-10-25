'use client'
import RedoAnimText from "./RedoAnimText";
import CursorBlinker from "./CursorBlinker";

// Heavily based off of: https://blog.noelcserepy.com/how-i-created-a-typing-text-animation-with-framer-motion
export default function AnimText({ texts, delay }: { texts: string[], delay: number }) {
    return (
        <>
            <RedoAnimText texts={texts} delay={delay} />
            <CursorBlinker />
        </>
    );
}