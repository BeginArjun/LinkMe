import Multiply from '@iconscout/react-unicons/icons/uil-times'
import {useState} from 'react'
interface ToasterProps{
    variant:'success'|'error';
    feedbackTitle:string;
    feedback:string;
    icons:React.ReactNode;
}

const Toaster=(props:ToasterProps)=>{
    const [show,setShow]=useState(true)
    return(
        <div 
        className={`flex flex-col p-4 items-center gap-2 w-fit
        rounded-lg ${props.variant==='success'?'bg-[--decorative-green]':'bg-[--feedback-danger]'} ${show?'visible':'hidden'}`}>
            <div className="flex items-center gap-2 self-stretch bg-transparent">
                {props.icons}
                <p className='font-bold text-base'>{props.feedbackTitle}</p>
                <Multiply onClick={()=>setShow(false)}/>
            </div>
            <p className='text-base bg-transparent'>{props.feedback}</p>
        </div>
    )
}
export default Toaster