import { NextResponse } from "next/server";
import serverAuth from "../../../lib/serverAuth";
export const GET=async(req:Request,res:Response)=>{
    try{
    const {user}=await serverAuth(req,res)
    return NextResponse.json({user},{status:200})
    }
    catch(err){
        return NextResponse.json({message:err},{status:500})
    }
}