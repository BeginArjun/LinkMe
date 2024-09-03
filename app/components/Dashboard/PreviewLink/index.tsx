'use client'

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect } from "react";
import { Links } from "@prisma/client";

type User = {
    links : Links[],
    id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    linkmeUrl : string
}

export default function Component() {
   const user = useSelector((state : RootState) => state.user as User | null);

   useEffect(()=>{
    console.log("Updating...")
   },[user?.links])
   
    return (
        <section className="hidden lg:flex fixed top-0 right-0 bottom-0 w-[280px] xl:w-[380px] 2xl:w-[480px] bg-slate-200 justify-center items-center p-4">
            <div className="flex flex-col justify-between items-center h-full w-full">
                <div className="text-center">
                    <p className="text-sm xl:text-base">Share</p>
                </div>
                {user?.username !== undefined && (
                    <iframe 
                        src={`http://localhost:3000/${user?.username}`}
                        className="w-[180px] xl:w-[280px] 2xl:w-[340px] aspect-[9/16] rounded-xl pointer-events-none"
                    >
                    </iframe>
                )}
                <div className="text-center">
                    <p className="text-sm xl:text-base">Made by LinkME</p>
                </div>
            </div>
        </section>
    );
}