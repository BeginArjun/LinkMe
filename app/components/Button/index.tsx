interface ButtonProps{
    className?:string;
    onClick?:()=>void;
    children?:React.ReactNode;
}

const Button=(props:ButtonProps)=>{
    return(
        <button className={`${props.className} rounded-full inline-flex justify-center items-center px-2 py-4 h-12 min-h-[48px] gap-4 border-[1px] border-black shadow-[-2px_2px_0_0_#000] 
        hover:shadow-[-2px_2px_0_0_#000] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all font-[--font-delaGothic]
        `} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;