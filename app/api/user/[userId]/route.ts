// userId should have been username

import client from "../../../../lib/prismadb"
import {NextResponse,NextRequest} from "next/server"

export const GET=async(req:Request,
    {params}:{params:{userId:string}})=>{
        try{
            const { userId } = params
            const user = await client.user.findUnique({
                where: {
                    username: userId
                },
                select:{
                    username:true,
                    links:true,
                    linkemeUrl:true,
                    image:true
                }
        })
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 })
            }
            return NextResponse.json(user, { status: 200 })
    }
    catch(err){
        return NextResponse.json({message:"FAIL",err},{status:500})
    }
}

export const PATCH=async(req:NextRequest,res:Response)=>{
        try{
            const userId=req.nextUrl.pathname.slice(10)
            const userExist=await client.user.findUnique({
                where:{
                    username:userId,
                },
            })
            if(!userExist){
                new NextResponse(JSON.stringify({message:"User not Authorized"}),{status:404})
                throw new Error("User not Authorized")
            }
            const body=await req.json()
            const {email,username}=body
            const userDataToUpdate: { email?: string; username?: string } = {};

            if (email) {
                const isEmailTaken = await client.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (isEmailTaken) {
                    return new NextResponse(JSON.stringify({ message: "Email taken" }), { status: 400 });
                }
                userDataToUpdate.email = email;
            }

            if (username) {
                const isUsernameTaken = await client.user.findUnique({
                    where: {
                        username,
                    },
                });
                if (isUsernameTaken) {
                    return new NextResponse(JSON.stringify({ message: "Username taken" }), { status: 400 });
                }
                userDataToUpdate.username = username;
            }   

            const updatedUser = await client.user.update({
                where: {
                    username: userId,
                },
                data: userDataToUpdate,
            });
            return new NextResponse(JSON.stringify(updatedUser),{status:200})
        }
        catch(err){
            new NextResponse(JSON.stringify(err),{status:500})
            throw new Error(err)
        }
}