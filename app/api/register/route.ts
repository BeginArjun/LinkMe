import bcrypt from 'bcrypt';
import client from '../../../lib/prismadb';

export const POST=async(req:Request)=>{
    try{
        const request=await req.json()
        const {username,password,email}=request;
        const userExist=await client.user.findUnique({
            where:{
                email:email
            }
        })
        if(userExist){
            return Response.json({message:"User already exist"},{status:422})
        }
        console.log(3)
        const salt=await bcrypt.genSalt(12);
        const hash=await bcrypt.hash(password,salt);
        const user=await client.user.create({
            data:{
                username,
                email,
                password:hash
            }
        })
        return Response.json(user,{status:200})
    }
    catch(err){
        return Response.json({message:err},{status:400})
    }
}