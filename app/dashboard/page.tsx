'use client'
import Button,{IconButton} from "../components/Button";
import UiPen from '@iconscout/react-unicons/icons/uil-pen'
import UiPlus from '@iconscout/react-unicons/icons/uil-plus'
import UiTrash from '@iconscout/react-unicons/icons/uil-trash'
import Modal from "../components/Modal";
import Input from "../components/Input";
import {useState,useEffect} from 'react';
import { useUser } from "../context/User";
import axios from "axios";
import Image from "next/image";
interface User{
    id:any;
    username:string;
    image:string;
    email:string;
}

const Header=({user})=>{
    console.log('Props',user)
    return(
        <div className="px-4 py-6 w-full flex flex-col gap-4 bg-[--decorative-yellow] rounded-lg shadow-[-2px_4px_0px_0px_#000]">
            <p className="font-bold text-3xl">Dashboard</p>
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div  className="rounded-full  border-2 border-black">
                    <Image src={user.image}
                     alt="profile-pic" width='100' height='100' className="rounded-full"/>
                     </div>
                     <a href="#" className="text-black font-bold underline">@{user.username}</a>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <EditProfile user={user}/>
                <Button className="w-32 font-medium bg-white">
                    <a href={user.username} target="_blank">Preview Link</a>
                </Button>
                <NewLink/>
                </div>
            </div>
        </div>
    )
}

const EditProfile=(props)=>{
    const [profile,setProfile]=useState({} as {email:string,username:string,image:string})
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setProfile({...profile,[name]:value})
    }
    console.log('api/user/'+props.user.id)
    return(
        <Modal display="Edit Profile" title="Edit Profile" method="patch" variant="primary" actionButton="Save Changes" load={profile} url={'api/user/'+props.user.id}>
                <Input label="Email" placeholder="New Email" type="email" name='email' value={profile?.email} onChange={handleInputChange}/>
                <Input label="Username" placeholder="New Username" type="text" name='username' value={profile?.username} onChange={handleInputChange}/> 
                <Input label="Image" placeholder="New Image" type="url" name='image' value={profile?.image} onChange={handleInputChange}/>
        </Modal>
    )
}

const NewLink=()=>{
    const [link,setLink]=useState({linkTitle:'',url:''})
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setLink({...link,[name]:value})
    }
    return(
        <Modal display="New Link"  icon={<UiPlus color='white'/>} title="New Link" variant='secondary' actionButton="Add" load={link} url='/api/link/generate' method="post">
            <Input label="Link Name" placeholder="Link Name" type="text" name="linkTitle" value={link.linkTitle} onChange={handleInputChange}/>
            <Input label="Link URL" placeholder="Link URL" type="url" name="url" value={link.url} onChange={handleInputChange}/>
        </Modal>
    )
}

const NotLinks=()=>{
    return(
        <div className="px-4 py-11 w-full flex flex-col justify-center gap-2">
            <p className="font-bold text-3xl">You have no links yet</p>
            <p className="text-lg">Create your first link by clicking the button below</p>
            <NewLink/>
        </div>
    )
}

const NotLinkMe=()=>{
    return(
        <div className="px-4 py-11 w-full flex flex-col justify-center gap-2">
            <p className="font-bold text-3xl">You have no LinkMe yet</p>
            <p className="text-lg">Create your first LinkMe by clicking the button below</p>
            <LinkTreeCreate/>
        </div>
    )
}

const LINKS=({user})=>{
    const links=user?.links
    const [link,setLink]=useState({} as {title:string,url:string,description:string})
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setLink({...link,[name]:value})
    }
    const deleteLink=async(e:React.ChangeEvent<HTMLElement>)=>{
        try{
            const id=e.target.id
            const {data}=await axios.delete('/api/link/'+id)
        }
        catch(err){
           return <p>An Error Occured</p>
        }
    }
    if(links.length==0){
        return <NotLinks/>
    }
    return(
        <div className="px-4 py-11 w-full">
            {links &&
            <ul className="flex flex-col gap-4">
                <p className="font-bold text-3xl">Your Links</p>
                <p className="text-lg">Easily Modify them Or Delete them for your Viewers 😊</p>
                { 
                    links.map((l,idx)=>{
                        return(
                         <li key={l?.id} className="flex items-center justify-between">
                            <a href={l?.url} target="_blank">
                                <Button className="sm:w-64 w-40 relative text-left flex justify-around hover:bg-[--brand-primary]">
                                <p className="font-medium">{l?.title}</p>
                            </Button>
                            </a>
                            <div className="px-4 gap-2 flex items-center">
                                <Modal icon={<UiPen color='white'/>} title="Edit Link" actionButton="Save Changes" load={link} url={'/api/link/update/'+l?.id} method="patch">
                                    <Input label="Link Name" placeholder="Link Name" type="text" name="title" value={link?.title} onChange={handleInputChange}/>
                                    <Input label="Link URL" placeholder="Link URL" type="url" name="link" value={link?.url} onChange={handleInputChange}/>
                                </Modal>
                                <IconButton icon={<UiTrash color='white' id={l.id}/>} className="bg-red" onClick={deleteLink}/>
                            </div>
                        </li>
                        )
                    })
                }
            </ul>
}
        </div>
    )
}

const LinkTreeCreate=()=>{
    const [linkTree,setLinkTree]=useState({})
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setLinkTree({...linkTree,[name]:value})
    }
    return(
     <Modal display="Create LinkMe" title="Create LinkMe" actionButton="Create" load={linkTree} url='/api/linkme/generate' method="post">
         <Input label="Description" placeholder="Description" type="text" name="description" onChange={handleInputChange} value={linkTree?.description}/>
    </Modal>  
    )
}

const Dashboard=()=>{
    const userDetail=useUser()
    const [user,setUser]=useState(null)
    useEffect(()=>{
        if(userDetail)
        setUser(userDetail)
    },[userDetail])
    return(
        <div className="p-4">
            { user?
            (
                <>
                <Header {...user}/>
                {user.user.linkemeUrl?<LINKS {...user}/>:<NotLinkMe/>}
                </>
            )
            :<p>Loading...</p>}
        </div>
    )
}
export default Dashboard;