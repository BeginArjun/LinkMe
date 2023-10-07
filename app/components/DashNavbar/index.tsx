'use client'
import { signOut } from "next-auth/react";
import Button from "../Button";

const Navbar=()=>{
    return(
        <header className="px-4 py-11 bg-[--brand-primary] h-10 min-h-[2.5rem] flex items-center">
            <nav className="flex justify-between items-center w-full">
            <img src="/assets/Logo.svg" alt="logo" width="100" height="100px"/>
            <Button className="font-medium w-32" onClick={()=>signOut()}>Sign Out</Button>
            </nav>
        </header>
    )
}
export default Navbar;