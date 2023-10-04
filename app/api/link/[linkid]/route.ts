import {NextResponse,NextRequest} from 'next/server'
import client from '../../../../lib/prismadb'
import serverAuth from '../../../../lib/serverAuth'
export const GET=async(req:NextRequest,res:NextResponse)=>{
    try{
        const linkid=req.nextUrl.pathname.slice(10)
        const {user}=await serverAuth(req,res)
        const link=await client.links.findUnique({
            where:{
                id:linkid,
            }
        })
        if(!link){
            return NextResponse.json({message:"Link not found"},{status:404})
        }
        return NextResponse.json(link,{status:200})
    }
    catch(err){
        return NextResponse.json({message:"FAIL",err:err},{status:500})
    }
}