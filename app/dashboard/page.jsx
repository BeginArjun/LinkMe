'use client'
import { useState } from "react";
import { InfoMessage } from "../components/Message";
import { useUser } from "../context/User";
import { motion, Reorder} from 'framer-motion'
import { FiPlus,FiStar, FiCalendar , FiImage, FiTrash2  } from "react-icons/fi";
import { PiUploadSimpleThin } from "react-icons/pi";
import { TbLayoutGridAdd } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import {
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    InputLeftAddon,
    InputRightAddon,Switch,
    Tooltip
} from '@chakra-ui/react'

const LinkTextBox=({title,url})=>{
    return(
        <FormControl className="flex flex-col gap-2">
            <FormLabel>Title</FormLabel>
            <InputGroup className='flex flex-row -mt-2'>
                <Input type='text' placeholder='Enter title' 
                border='1px'
                _focus={{borderColor:'black',border:'2px',boxShadow:'none'}}
                />
            </InputGroup>
            <FormLabel>URL</FormLabel>
            <InputGroup className='flex flex-row -mt-2'>
                <InputLeftAddon border='1px'>https://</InputLeftAddon>
                <Input type='text' placeholder='Enter URL' border='1px' 
                _focus={{borderColor:'black',border:'2px',boxShadow:'none'}}
                />
            </InputGroup>
            <div className="flex flex-row items-center justify-between gap-4 mt-2">
                <Tooltip label='Layout' hasArrow>
                    <span><TbLayoutGridAdd/></span>
                </Tooltip>
                <Tooltip label='Prioritize' hasArrow>
                    <span><FiStar /></span>
                </Tooltip>
                <Tooltip label='Schedule' hasArrow>
                    <span><FiCalendar /></span>
                </Tooltip>
                <Tooltip label='Thumbnail' hasArrow>
                    <span><FiImage /></span>
                </Tooltip>
            </div>
        </FormControl>
    )
}

const LinkItem=({title,url})=>{
    return(
        <motion.div className="w-fit p-2 flex flex-row gap-4 items-center justify-center border-2 rounded-md">
            <div className="cursor-move">
                <RxDragHandleDots2 size='1rem'/>
            </div>
            <div>
                <LinkTextBox/>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
                <div className="flex flex-row gap-2">
                    <Tooltip label='Finsh setting up your link first'>
                    <span className="cursor-pointer">
                        <PiUploadSimpleThin/>
                    </span>
                    </Tooltip>
                    <Switch colorScheme="teal"/>
                </div>
                <div className="cursor-pointer">
                    <FiTrash2 size='1.2rem' color='red'/>
                </div>
            </div>
            
        </motion.div>
    )
}

const Links=()=>{
    const [links,setLinks]=useState(['item1','item2','item3'])
    console.log(links)
    return(
       <Reorder.Group axis="y" values={links} onReorder={setLinks} className="flex flex-col gap-2 border-2 border-black
       px-2 py-10 rounded-xl justify-center items-center
       ">
            {links.map((item,idx)=>(
                <Reorder.Item key={item} value={item}>
                    <LinkItem title={item}/>
                </Reorder.Item>
            ))}
       </Reorder.Group>
    )
}


const LeftDashboard=()=>{
    const {user,setUser}=useUser()
    return(
        <div className="p-2 flex flex-col gap-4">
            <InfoMessage
                title={`Your LinkME is live : @${user?.user?.username}`}
                message="Share your LinkME with your friends"
            />
            <div className="p-2">
               <button className="bg-black text-white rounded-full w-full flex flex-row items-center p-2 justify-center hover:bg-white hover:text-black 
               border-2 border-black active:bg-[#FF8ACD]
               ">
                    <FiPlus />
                    <p>Add Link</p>
               </button>
            </div>
            <Links/>
        </div>
    )
}

export default function Dashboard(){
    return(
        <div className="bg-white h-screen grid md-grid-rows-2 grid-cols-2 gap-2">
            <div className="border-r-2 border-black">
                <LeftDashboard/>
            </div>
            <div>
                
            </div>
        </div>
    )
}