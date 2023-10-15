'use client'
import { FaArrowRightLong } from "react-icons/fa6";
interface ButtonProps{
    className?:string;
    onClick?:(event: React.MouseEvent<HTMLButtonElement>) => void;
    children?:React.ReactNode;
    variant?:'primary' | 'secondary';
    icon?:React.ReactNode;
}

const Button=(props:ButtonProps)=>{
    return(
        <button className={`${props.className} bg-[${props.variant==='primary'?'--brand-primary':'#000'}] rounded-full inline-flex justify-center items-center px-2 py-4 h-12 min-h-[48px] gap-4 border-[1px] border-black shadow-[-2px_2px_0_0_#000] 
        hover:shadow-[-2px_2px_0_0_#000] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all font-[--font-delaGothic]
        `} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export const IconButton=(props:ButtonProps)=>{
    return(
        <button className={`${props.className} text-center ${props.variant==='primary'? 'bg-[--brand-primary]' : 'bg-[--secondary]' } ${props.variant==='primary'? 'text-black' : 'text-white' } rounded-full inline-flex justify-center items-center px-2 py-4 h-12 min-h-[48px] gap-4 border-[1px] border-black shadow-[-2px_2px_0_0_#000] 
        hover:shadow-[-2px_2px_0_0_#000] focus:bg-[--brand-primary] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all font-[--font-delaGothic]`}
        onClick={props.onClick}
        >
            <div className="flex items-center justify-center gap-2">
            {props.children}
            {props.icon && <div className="mr-2">{props.icon}</div>}
            </div>
        </button>
    )
}

export const ArrowButton=(props:ButtonProps)=>{
    return(
        <button className={`${props.className} group rounded-full inline-flex justify-center items-center px-7 py-6 h-12 min-h-[48px] gap-2`}>
            {props.children}
            <div className='group-hover:translate-x-2 transition delay-75 ease-in'>
            <FaArrowRightLong/>
            </div>
        </button>
    )
}

export default Button;