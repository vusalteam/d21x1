"use client";
import Navigation from "@/components/header/nav/Navigation";

export default function Header() {
    return (
        <header className=" fixed z-10 w-full bg-white border-b border-gray-300 shadow-zinc-700 drop-shadow-lg shadow-ls">
            <Navigation/>
        </header>
    )
}
