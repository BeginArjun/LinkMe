import { useCallback } from "react";
import Button from "../../Button";

export default function AddHeader(){

    const onClick = useCallback(()=>{
        console.log('Add Header')
    },[])

    return(
        <Button variant='outlined' width="fit" height="auto" className="p-2" aria-label="Add Header" onClick={onClick}>
            Add Header
        </Button>
    )
}