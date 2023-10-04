import {getServerSession} from 'next-auth'
import {NextRequest,NextResponse} from 'next/server'
import {NextApiRequest,NextApiResponse} from 'next'
import {authOptions} from '../app/api/auth/[...nextauth]/route'
import client from './prismadb'

const serverAuth=async(req:Request,res:Response)=>{
    try{
        const session = await getServerSession(
            req as unknown as NextApiRequest,
            {
            ...res,
            getHeader: (name: string) => res.headers?.get(name),
            setHeader: (name: string, value: string) => res.headers?.set(name, value),
            } as unknown as NextApiResponse,
            authOptions
        );
        if (!session?.user) {
            new NextResponse(JSON.stringify({ error: 'Unauthorized : Not Logged In' }), { status: 401 })
            throw new Error("Unauthorized : Not Logged In")
        }
        const user = await client.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            new NextResponse(JSON.stringify({ error: 'Unauthorized : User Does not Exist' }), { status: 401 })
            throw new Error("Unauthorized : User Does not Exist")
        }
        return { user }
    }
    catch(err){
        throw new Error(err)
    }
}
export default serverAuth