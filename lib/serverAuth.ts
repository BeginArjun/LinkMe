import {getServerSession} from 'next-auth'
import {NextApiRequest,NextApiResponse} from 'next'
import {NextResponse} from 'next/server'
import {authOptions} from '../app/api/auth/[...nextauth]/route'
import client from './prismadb'

const serverAuth=async(req:NextApiRequest,res:NextApiResponse)=>{
    const session=await getServerSession(req,res,authOptions)
    if(!session?.user){
        new NextResponse(JSON.stringify({error:'Unauthorized : Not Logged In'}),{status:401})
        throw new Error('Unauthorized: Not Logged In')
    }
    const user=await client.user.findUnique({
        where:{
            email:session.user.email
        }
    })
    if(!user){
        new NextResponse(JSON.stringify({error:'Unauthorized : User Does not Exist'}),{status:401})
        throw new Error('Unauthorized: User Does not exist')
    }
    return user
}
export default serverAuth