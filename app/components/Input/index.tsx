interface InputProps{
    className?:string;
    label?:string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    value?:string;
    type?:string;
    name?:string;
    icon?:React.ReactNode;
    placeholder?:string;
}

const Input=(props:InputProps)=>{
    return(
        <label>
        {props.label}
        <div 
        className="flex h-12 min-h-[48px] px-[10px] py-2 items-center gap-2 self-stretch rounded-lg border-black border-[1px] hover:border-2 focus:border-[--brand-primary]">
            {props.icon && 
        <span className="text-xs font-semibold leading-tight">{props.icon}</span>
        }
        <input name={props.name} onChange={props.onChange} className={`${props.className} text-base leading-[20px] text-[--base-grey] focus:outline-none focus:ring-0 bg-transparent`} 
        value={props.value} type={props.type} placeholder={props.placeholder}/>
        </div>
        </label>
    )
}

export default Input;