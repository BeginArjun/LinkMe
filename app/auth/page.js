'use client'
import axios from 'axios'
import { useCallback } from 'react'
import {signIn} from 'next-auth/react'
import Button from '../components/Button'
import Input from '../components/Input'
import UilMail from '@iconscout/react-unicons/icons/uil-envelope'
import UiLock from '@iconscout/react-unicons/icons/uil-lock'
import UiUser from '@iconscout/react-unicons/icons/uil-user'
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'

const Auth=()=>{
    const [value,setValue]=useState({username:'',password:'',email:''})
    const [variant,setVariant]=useState('register')
    const [withEmail,setWithEmail]=useState(false)
    const [error,setError]=useState(null)
    const [success,setSuccess]=useState(false)
    const toggleVariant=useCallback(()=>{
        setVariant((prev)=>prev==='register'?'login':'register')
    },[])

    const handleChange=(e)=>{
        const val=e.target.value
        const name=e.target.name
        setValue({...value,[name]:val})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(value)
        variant==='register'?await register():await login()
        
    }

    const login=useCallback(async()=>{
        try{
            const data=await signIn('credentials',{
                email:value.email,
                password:value.password,
                redirect:true,
                callbackUrl:'/dashboard'
            })
            console.log(data);
            setSuccess(true)
        }
        catch(err){
            setError(err)
            console.log(err);
        }
    },[value])

    const register=useCallback(async()=>{
        try{
            await axios.post('/api/register',{
                username:value.username,
                password:value.password,
                email:value.email
            })
            setSuccess(true)
        }
        catch(err){
            setError(err)
            console.log(err)
        }
    },[value])
    if(error){
        setTimeout(()=>{
            setError(null)
        },3000)
    }
    return(
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className='font-bold text-center text-xl'>{variant==='register'?'Register':'Login'}</h1>
            <div className='m-auto flex flex-col justify-center items-center gap-4 w-[90vw] p-2'>
                <Input onChange={handleChange} name='email' placeholder='johndoe@gmail.com' label='Email' 
                icon={<UilMail/>}
                value={value.email} type="email" className='w-full'/>
                {
                    variant==='register' &&
                    <Input onChange={handleChange} value={value.username} name='username' placeholder="John Doe" type='text' icon={<UiUser/>} label='Username'/>
                }
                {
                    ((withEmail && variant==='login') || variant==='register') && 
                    <Input onChange={handleChange} name='password' label='Password' value={value.password} type="password" icon={<UiLock/>}/>
                }
                { (!withEmail && variant==='login') && <>
                    <Button onClick={()=>setWithEmail(true)} className='bg-white w-full md:w-auto'>Continue with Email</Button>
                <p>Or</p>
                <Button onClick={()=>signIn('google')} className='bg-black text-white w-full md:w-auto'>Continue with <FcGoogle/></Button>
                </>
                }
                {
                    (withEmail || variant==='register') &&
                    <Button onClick={handleSubmit} className='bg-[--brand-primary] w-full md:w-1/3 font-medium'>{variant=='register'?'Sign Up':'Sign In'}</Button>
                }
                <p className='text-xs font-medium'>{variant==='register'?"Already a user? ":"Don't have an account? " }
                <span className='font-bold underline cursor-pointer' onClick={toggleVariant}>
                    { variant==='register'?'Sign In':'Register Now'}
                </span></p>
            </div>
        </div>
    )
}
export default Auth