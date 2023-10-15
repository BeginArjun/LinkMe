'use client'
import { FiShare2 } from "react-icons/fi";
import { usePathname} from 'next/navigation'
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react'
import Links from "../components/LINK";
import Image from "next/image";

interface LinkMe{
    description:string,
    user:{
        username:string,
        image:string,
        links:{
            id:string,
            title:string,
            url:string
        }[]
    }
}

const LINKS=({links})=>{
    const color=['#ff5e5e','#42c1d5','#de7dff','#feb444','#02ff75']
    const randomColor=color[Math.floor(Math.random()*color.length)]
    return(
        <div className="flex flex-col items-center justify-center gap-3 w-full">
            {
                links.map((link,idx)=><Links key={idx} link={link} color={color[Math.floor(Math.random()*color.length)]}/>)
            }
        </div>
    )
}

const Header=({user})=>{
    return(
        <div className="flex flex-col items-center justify-center gap-3">
            <Image src={user.user?.image} alt="profile-pic" width='100' height='100' className="rounded-full"/>
            <p className="font-bold">@{user.user.username}</p>
            <p className="font-medium">{user.description}</p>
        </div>
    )
}

const LinkMe=()=>{
    const pathName=usePathname()
    const slug=pathName.slice(1)
    const [linkme,setLinkMe]=useState({} as LinkMe)
    const [isLoading,setIsLoading]=useState(true)
    const {data,status}=useSession()
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await fetch(`/api/linkme/${slug}`)
            const data=await res.json()
            setLinkMe(data)
        }
        fetchData()
        if(linkme?.description){
            setIsLoading(false)
        }
    },[isLoading,linkme?.description])

    const {description,user}=linkme

    const shareData={
        title:"LinkMe",
        text:"Hey,Check out my LinkMe page",
        url:window.location.href
    }

    const share=async()=>{
        try{
            await navigator.share(shareData)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <main className="bg-[--brand-yellow] p-10 h-screen">
            <div className="flex flex-col justify-center items-center gap-6">
                {linkme.user && <Header user={linkme}/>}
                {linkme.user && <LINKS links={linkme.user.links}/>}
            </div>
        </main>
    )
}

export default LinkMe;