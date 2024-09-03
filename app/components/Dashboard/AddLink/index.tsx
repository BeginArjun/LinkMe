import { FiPlus } from "react-icons/fi";
import Button from "../../Button";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addLink } from "../../../../redux/slice/linkSlice";
import { Api } from "../../../../utils/apis";

export default function AddLink(){

    const dispatch = useDispatch()

    const createLink = useCallback(()=>{
        const newLink = {
            title : 'Untitled',
            url : '',
            icon : '',
            visible : false,
        }
        dispatch(addLink(newLink))
    },[])

    const onClick = useCallback(async()=>{
        createLink()
        try {
            const request = await Api.createLink({
                linkTitle : 'Untitled',
                url : '',
            })
            console.log(request)
        }
        catch(err){
            console.log(err)
        }
    },[])


    return(
        <Button width="full" height="auto" className="px-2 py-2" aria-label="Add Links" onClick={onClick}>
            <p className="text-md text-black font-medium">New Link</p>
            <FiPlus className="text-black text-md before:content-[' ']"/>
        </Button>
    )
}