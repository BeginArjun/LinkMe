'use client'
import { Client, Storage } from "appwrite"

export const uploadFile = async(file : File) => {
    console.log("File : ",typeof file)
    const client = new Client();
    const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID as string
    
    client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const storage = new Storage(client)

    return {client, storage, BUCKET_ID}
}