import {NextResponse,NextRequest} from 'next/server';
import client from '../../../../../lib/prismadb';
import serverAuth from '../../../../../lib/serverAuth';

export const GET=async(req:Request,{params}:{params:{linkid:string}})=>{
    const {linkid}=params
    return NextResponse.json({linkid},{status:200})
}

export const PATCH=async(req:NextRequest,res:NextResponse)=>{
    try{
        const linkid=req.nextUrl.pathname.slice(17)
        console.log(linkid)
        const {user}=await serverAuth(req,res)
        const linkExist=await client.links.findUnique({
            where:{
                id:linkid,
                userId:user.id
            }
        })
        if(!linkExist){
            return NextResponse.json({message:"Link not found"},{status:404})
        }
        const body=await req.json()
        const {title,description,link}=body
        const linkDataToUpdate: { title?: string; description?: string; url?: string } = {};
        if(title){
            linkDataToUpdate.title=title
        }
        if(description){
            linkDataToUpdate.description=description
        }
        if(link){
            linkDataToUpdate.url=link
        }
        const updatedLink=await client.links.update({
            where:{
                id:linkid
            },
            data:linkDataToUpdate
        })
        return NextResponse.json(updatedLink,{status:200})

    }
    catch(err){
        NextResponse.json({message:"FAIL",err},{status:500})
        throw new Error(err)
    }
}