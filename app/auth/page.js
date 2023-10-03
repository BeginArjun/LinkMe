'use client'
import axios from 'axios'
import { useCallback } from 'react'
import {signIn} from 'next-auth/react'
import { useState } from 'react'
const Auth=()=>{
    const [value,setValue]=useState({username:'',password:'',email:''})
    const [variant,setVariant]=useState('register')
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
                redirect:false,
                callbackUrl:'/'
            })
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    })

    const register=useCallback(async()=>{
        try{
            await axios.post('/api/register',{
                username:value.username,
                password:value.password,
                email:value.email
            })
        }
        catch(err){
            console.log(err)
        }
    },[value])
    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className='text-black flex flex-col'>
                { variant==='register' &&
                <input type="text" name="username" value={value.username} onChange={handleChange} placeholder="Username" />
                }
                <input type="text" name="email" value={value.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={value.password} onChange={handleChange} placeholder="Password" />
                <button type="submit" className='bg-black text-white'>{variant==='register'?'Sign Up':'Sign In'}</button>
            </form>
            <p>Already a user? <span onClick={toggleVariant} className='underline'>{variant==='register'?'Sign Up':'Sign In'}</span></p>
        </div>
    )
}
export default Auth