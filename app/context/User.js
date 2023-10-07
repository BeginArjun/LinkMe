'use client'
import {useState,useEffect,useContext,createContext} from 'react'
export const UserContext = createContext(null)

export const UserProvider=({children})=>{
    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res = await fetch('/api/current-user')
                const newUser = await res.json()
                setUser((prevUser)=>{
                    if(JSON.stringify(prevUser)!==JSON.stringify(newUser)){
                        return newUser
                    }
                })
            }
            catch(err){
                throw new Error(err)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    },[user])
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = ()=>{
    const user = useContext(UserContext)
    return user
}
export default UserProvider