'use client'
import { signOut } from "next-auth/react";
import Button from "../Button";
import Image from "next/image";
import { FiLink2, FiSettings, FiTablet, FiMenu, FiX } from "react-icons/fi";
import React, { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
    {
        to: "/",
        icon: <FiLink2 />,
        title: "Links"
    },
    {
        to: "/appearance",
        icon: <FiTablet />,
        title: "Appearance"
    },
    {
        to: "/settings",
        icon: <FiSettings />,
        title: "Settings"
    }
]

const NAV_LINKS = ({ to, icon, title, onClick }: { to: string, icon: React.JSX.Element, title: string, onClick?: () => void }) => {
    return (
        <Link href={to} className="flex items-center justify-start w-full text-black text-md font-medium gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={onClick}>
            {icon}
            <p className="">{title}</p>
        </Link>
    )
}

export default function Component() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <>
            <button 
                className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
                onClick={toggleNavbar}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <header className={`z-40 bg-white fixed top-0 left-0 h-screen w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
                <nav className="flex flex-col p-4 justify-between items-start h-full bg-white border-r-2 border-gray-200 shadow-md">
                    <div className="w-full">
                        <Image src="/assets/logo.svg" alt="logo" width="100" height="100" className="mb-8" />
                        {NAV_ITEMS.map((item, index) => (
                            <NAV_LINKS key={index} {...item} onClick={() => setIsOpen(false)} />
                        ))}
                    </div>
                    <Button className="font-medium w-full bg-[--brand-primary] mt-auto" onClick={() => signOut()}>Sign Out</Button>
                </nav>
            </header>
        </>
    );
}