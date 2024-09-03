'use client'

import { TailSpin } from "react-loader-spinner"



const Loading=()=>{
    return(
        <div className="w-screen h-screen bg-white">
            <TailSpin width={100} height={100} color="#000"/>
        </div>
    )
}
export default Loading