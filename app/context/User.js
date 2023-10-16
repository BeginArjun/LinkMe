'use client'
import {useState,useEffect,useContext,createContext} from 'react'
export const UserContext = createContext(null)

export const UserProvider=({children})=>{
    const [user,setUser] = useState(null)
    const userSet=(newUser)=>{
        if(JSON.stringify(newUser)!==JSON.stringify(user)){
            setUser(newUser)
        }
    }
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res = await fetch('/api/current-user')
                const newUser = await res.json()
                userSet(newUser)
            }
            catch(err){
                throw new Error(err)
            }
        }
        fetchUser()
    },[user])
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = ()=>{
    const user = useContext(UserContext)
    return user
}
export default UserProvider