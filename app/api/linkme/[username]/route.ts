import client from "../../../../lib/prismadb";
import { NextResponse,NextRequest } from "next/server";
import serverAuth from "../../../../lib/serverAuth";
export const GET=async(req:Request,{params}:{params:{username:string}})=>{
    const {username}=params
    try{
        const isUser=await client.user.findUnique({
            where:{
                username:username
            }
        })
        if(!isUser){
            NextResponse.json({message:'User not found'},{status:404})
            throw new Error('User not found')
        }
        const linkme=await client.linkme.findUnique({
            where:{
                userId:isUser.id
            },
            select:{
                description:true,
                user:{
                    select:{
                        username:true,
                        image:true,
                        links:true
                    }
                }
            }
        })
        if(!linkme){
            NextResponse.json({message:'Linkme not found'},{status:404})
            throw new Error('Linkme not found')
        }
        return NextResponse.json(linkme,{status:200})

    }
    catch(err){
        NextResponse.json({message:'Something went wrong'},{status:500})
        throw new Error(err)
    }
}

export const PATCH=async(req:NextRequest,res:NextResponse)=>{
    try{
        const username=req.nextUrl.pathname.slice(12)
        const {user}=await serverAuth(req,res)
        const {description}=await req.json()
        const linkmeExist=await client.linkme.findUnique({
            where:{
                userId:user.id,
                AND:{
                    user:{
                        username
                    }
                }
            }
        })
        if(!linkmeExist){
            NextResponse.json({message:'Linkme not found'},{status:404})
            throw new Error('Linkme not found')
        }
        const linkme=await client.linkme.update({
            where:{
                userId:user.id
            },
            data:{
                description
            }
        })
        return NextResponse.json(linkme,{status:200})
    }
    catch(err){
        NextResponse.json({message:'Something went wrong'},{status:500})
        throw new Error(err)
    }
}