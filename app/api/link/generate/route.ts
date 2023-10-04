import client from "../../../../lib/prismadb";
import serverAuth from "../../../../lib/serverAuth";
import {NextResponse} from 'next/server'

export const POST=async(req:Request,res:Response)=>{
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
        return NextResponse.json(link,{status:200})
    }
    catch(err){
        return NextResponse.json(err,{status:500})
    }
}