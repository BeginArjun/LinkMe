'use client'
import { signOut } from "next-auth/react";
import Button from "../Button";
import { FiUser, FiLogOut , FiPenTool, FiMail   } from "react-icons/fi";
import Image from "next/image";
import { IconButton, Menu, MenuButton, 
    MenuDivider, MenuGroup, MenuItem, MenuList} from '@chakra-ui/react'
import { AvatarIcon } from "../AvatarIcon";


const SignOutButton=()=>{
    return(
        <div onClick={()=>signOut()}>Log Out</div>
    )
}

const AvatarMenu=()=>{
    return (
    <Menu>
        <MenuButton 
            as={IconButton} 
            icon={<AvatarIcon/>}
            aria-label="Options"
            _hover={{bg:'transparent'}}
         />
        <MenuList borderColor='black' borderWidth={2}>
            <MenuGroup title='Profile'>
                <MenuItem command='⌘P' icon={<FiUser/>}>My Account</MenuItem>
                <MenuItem command='⌘C'>Cookie Preference</MenuItem>
            </MenuGroup>
            <MenuDivider/>
            <MenuGroup title='Support'>
                <MenuItem command='⌘A' icon={<FiMail />}>Ask a question</MenuItem>
                <MenuItem command='⌘F' icon={<FiPenTool />}>Submit feedback</MenuItem>
            </MenuGroup>
            <MenuDivider/>
            <MenuItem command='⌘D' icon={<FiLogOut/>} color='red'><SignOutButton/></MenuItem>
        </MenuList>
    </Menu>
    )
}

const Navbar=()=>{
    return(
        <header className="px-4 py-11 bg-[--brand-primary] h-10 min-h-[2.5rem] flex items-center border-b-2 border-black">
            <nav className="flex justify-between items-center w-full">
            <Image src="/assets/logo.svg" alt="logo" width="100" height="100"/>
            <AvatarMenu/>
            {/* <Button className="font-medium w-32" onClick={()=>signOut()}>Sign Out</Button> */}
            </nav>
        </header>
    )
}
export default Navbar;