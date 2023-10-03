import {NextResponse} from 'next/server'
import serverAuth from '../../../../lib/serverAuth'
import {NextApiRequest,NextApiResponse} from 'next'
export const GET=async(req:NextApiRequest,res:NextApiResponse)=>{
    try{
        const user=await serverAuth(req,res)
        new NextResponse(JSON.stringify(user),{status:200})
    }
    catch(err){
        new NextResponse(JSON.stringify(err),{status:500})
        throw new Error(err)
    }
}