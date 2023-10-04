import {NextResponse} from 'next/server'
import serverAuth from '../../../../lib/serverAuth'
import client from '../../../../lib/prismadb'

export const POST=async(req:Request,res:NextResponse)=>{
    try{
        const {user}=await serverAuth(req,res)
        const {description}=await req.json()
        const linkmeExist=await client.linkme.findUnique({
            where:{
                userId:user.id
            }
        })
        if(linkmeExist){
            NextResponse.json({message:'Linkme already exist'},{status:400})
            throw new Error('LinkMe Already Exist')
        }
        const linkme=await client.linkme.create({
            data:{
                description,
                userId:user.id
            }
        })
        return NextResponse.json(linkme,{status:200})
    }
    catch(err){
        NextResponse.json({message:'Something went wrong'},{status:500})
        throw new Error(err)
    }
}