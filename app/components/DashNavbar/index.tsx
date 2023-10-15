'use client'
import { signOut } from "next-auth/react";
import Button from "../Button";
import Image from "next/image";

const Navbar=()=>{
    return(
        <header className="px-4 py-11 bg-[--brand-primary] h-10 min-h-[2.5rem] flex items-center border-b-2 border-black">
            <nav className="flex justify-between items-center w-full">
            <Image src="/assets/Logo.svg" alt="logo" width="100" height="100"/>
            <Button className="font-medium w-32" onClick={()=>signOut()}>Sign Out</Button>
            </nav>
        </header>
    )
}
export default Navbar;