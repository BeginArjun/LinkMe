'use client'

import React, { createContext, useCallback, useEffect, useTransition } from "react"
import { setUser } from "../../redux/slice/userSlice"
import { store } from "../../redux/store"
import { setLinks } from "../../redux/slice/linkSlice"

const InitializerContext = createContext<boolean>(false)

const Initializer = ({ children } : {children : React.ReactNode}) => {

    const [isPending, startTransition] = useTransition()

    
    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch('/api/current-user')
            const user = await response.json()
            if(user?.user) {
                store.dispatch(setUser(user?.user))
                store.dispatch(setLinks(user?.user?.links))
            }
        } catch (error) {
            console.error(error)
        }
    },[])

    useEffect(()=>{
        startTransition(() => {
            fetchUser()
        })
    },[])


    return (
       <InitializerContext.Provider value={isPending}>
              {children}
        </InitializerContext.Provider>
    )
}

export default Initializer