import {NextResponse,NextRequest} from 'next/server';
import client from '../../../../../lib/prismadb';
import serverAuth from '../../../../../lib/serverAuth';

type LinkInput = {
    title?: string, 
    description?: string,
    url?: string,
    visible?: boolean,
    icon?: string,
    layout?: "CLASSIC" | "CUSTOM",
    iconType?: "IMAGE" | "TABLER",
    scheduledAt? : Date,
}

const extractLinkId = (pathname: string): string => {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
};


export const GET=async(req:Request,{params}:{params:{linkid:string}})=>{
    const {linkid}=params
    return NextResponse.json({linkid},{status:200})
}

export const PATCH=async(req:NextRequest,res:NextResponse)=>{
    try{
        const linkid = extractLinkId(req.nextUrl.pathname);
        console.log(linkid)
        const authResult = await serverAuth(req, res);
        if (!authResult || !authResult.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { user } = authResult;
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
        const {title,description,link,visible,icon,layout,iconType}=body

        const linkDataToUpdate: LinkInput = {
            ...(title && { title }),
            ...(description && { description }),
            ...(link && { url: link }),
            ...(visible !== undefined && { visible }),
            ...(icon && { icon }),
            ...(layout && { layout }),
            ...(iconType && { iconType }),
        };

        const updatedLink=await client.links.update({
            where:{
                id:linkid
            },
            data:linkDataToUpdate
        })
        return NextResponse.json(updatedLink,{status:200})

    }
    catch(err){
        return NextResponse.json({message:"FAIL",err},{status:500})
    }
}