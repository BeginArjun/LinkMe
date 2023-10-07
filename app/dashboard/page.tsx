'use client'
import Button from "../components/Button";
import UiPen from '@iconscout/react-unicons/icons/uil-pen'
import Modal from "../components/Modal";
import Input from "../components/Input";
import {useState,useEffect} from 'react';
import { useUser } from "../context/User";
interface User{
    id:any;
    username:string;
    image:string;
    email:string;
}

const Header=({user})=>{
    console.log('Props',user)
    return(
        <div className="px-4 py-6 w-full flex flex-col gap-4">
            <p className="font-bold text-3xl">Dashboard</p>
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                <div className="flex flex-col justify-center items-center">
                    <img src={user.image}
                     alt="profile-pic" className="rounded-full" width='100' height='100'/>
                     <a href="#" className="text-[--brand-primary] underline">@{user.username}</a>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <EditProfile user={user}/>
                <Button className="w-32 font-medium">
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
        <Modal display="Edit Profile" title="Edit Profile" method="patch" actionButton="Save Changes" load={profile} url={'api/user/'+props.user.id}>
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
        <Modal display="New Link" title="New Link" actionButton="Add" load={link} url='/api/link/generate' method="post">
            <Input label="Link Name" placeholder="Link Name" type="text" name="linkTitle" value={link.linkTitle} onChange={handleInputChange}/>
            <Input label="Link URL" placeholder="Link URL" type="url" name="url" value={link.url} onChange={handleInputChange}/>
        </Modal>
    )
}

const LINKS=({user})=>{
    const links=user?.links
    const [link,setLink]=useState({} as {title:string,url:string,description:string})
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setLink({...link,[name]:value})
    }
    return(
        <div className="px-4 py-11 w-full">
            {links &&
            <ul className="flex flex-col gap-4">
                { 
                    links.map((l,idx)=>{
                        return(
                         <li key={l?.id}>
                    <Button className="w-full relative text-left flex justify-around">
                            <a href={l?.url} target="_blank">
                                <p className="font-medium">{l?.title}</p>
                            </a>
                        <div className="absolute right-2 px-4">
                            <Modal display="Edit Link" title="Edit Link" actionButton="Save Changes" load={link} url={'/api/link/update/'+l?.id} method="patch">
                                <Input label="Link Name" placeholder="Link Name" type="text" name="title" value={link?.title} onChange={handleInputChange}/>
                                <Input label="Link URL" placeholder="Link URL" type="url" name="link" value={link?.url} onChange={handleInputChange}/>
                            </Modal>
                        </div>
                    </Button>
                </li>
                        )
                    })
                }
            </ul>
}
        </div>
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
        <>
            {   user &&
                <>
                <Header {...user}/>
                <LINKS {...user}/>
                </>
            }
        </>
    )
}
export default Dashboard;