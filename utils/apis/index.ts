import { Endpoint } from './constants';

type LinkInput = any

export const Api = {
    getUser : async ()=>{
        const res = await fetch(Endpoint['CURRENT-USER'])
        return res.json()
    },
    getLink : async (linkid:string)=>{
        const res = await fetch(`${Endpoint['GET-LINK']}/${linkid}`)
        return res.json()
    },
    createLink : async (data : LinkInput) =>{
        const res = await fetch(Endpoint['CREATE-LINK'],{
            method:'POST',
            body:JSON.stringify(data)
        })
        return res.json()
    },
    updateLink : async (linkid:string,data:LinkInput)=>{
        try {
            const res = await fetch(`${Endpoint['UPDATE-LINK']}/${linkid}`,{
                method:'PATCH',
                body:JSON.stringify(data)
            })
            return res.json()
        } catch(error : any) {
            console.log("Error : ",error)
            throw new Error("Error updating link", error.stack)
        }
    },
    getLinkMe : async (userId:string)=>{
        const res = await fetch(`${Endpoint['GET-LINKME']}/${userId}`)
        return res.json()
    },
}