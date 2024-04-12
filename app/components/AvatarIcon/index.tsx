import { Avatar } from "@chakra-ui/react"
import { useUser } from "../../context/User"

export const AvatarIcon=()=>{
    const {user,setUser}=useUser()
    return(
        <div>
            <Avatar name={user?.user?.username} className="border-2 border-black"/>
        </div>
    )
}