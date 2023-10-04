'use client'
import { FiShare2 } from "react-icons/fi";
import { usePathname} from 'next/navigation'
import {useState,useEffect} from 'react';
import {useSession} from 'next-auth/react'

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
    },[isLoading])

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
        <main className="bg-[--primary] p-10 h-screen">
            <div onClick={share}>
                <FiShare2 className="text-xl"/>
            </div>
            <div className='m-auto flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center gap-4'>
                    <img src={user?.image}
                     alt="profile-pic" width="100" height="100" className='rounded-full border-2 border-[--text-primary] p-2'/>
                    <p className='text-[--text-primary] text-base'>@{user?.username}</p>
                    <p className="font-medium">{description}</p>
                    { data?.user?.name===slug&&
                    <button className="text-white bg-[--text-primary] rounded-md w-40 h-10">
                        Edit Profile
                    </button>
                    }
                </div>
                <div>
                    <ul className="text-[--text-primary] text-center flex flex-col items-center gap-4 justify-center">
                        {
                            user?.links?.map((link,index)=>{
                                return(
                                    <a href={link?.url} key={link?.id}>
                                    <li className="cursor-pointer hover:text-white hover:bg-gradient-to-r hover:scale-110 hover:ease-in hover:duration-100 from-[#703da3] border-2 border-[--text-primary] w-60 h-12 flex justify-center items-center">
                                        {link?.title}
                                    </li>
                                    </a>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default LinkMe;