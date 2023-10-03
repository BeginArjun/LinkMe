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
            new Response(JSON.stringify({message:"User already exist"}),{status:422})
            throw new Error("User already exist")
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
        return new Response(JSON.stringify(user),{status:200})
    }
    catch(err){
        new Response(JSON.stringify({message:err}),{status:400})
        throw new Error(err)
    }
}