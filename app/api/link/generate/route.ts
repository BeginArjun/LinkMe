import client from "../../../../lib/prismadb";
import serverAuth from "../../../../lib/serverAuth";
import {NextResponse} from 'next/server'

export const POST=async(req:Request,res:NextResponse)=>{
    try{
        const {user}=await serverAuth(req,res)
        const {linkTitle,url}=await req.json()
        const link=await client.links.create({
            data:{
                title:linkTitle,
                url,
                userId:user.id
            }
        })
        return new NextResponse(JSON.stringify(link),{status:200})
    }
    catch(err){
        new NextResponse(JSON.stringify(err),{status:500})
        throw new Error(err)
    }
}