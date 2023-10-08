interface Links{
    title:string;
    url:string;
    color?:string;
}

const Links=({link,color}:{link:Links,color:string})=>{
    return(
        <a href={link.url} target="_blank" style={{backgroundColor:color}}
        className={`px-4 py-2 text-center shadow-[4px_4px_0px_0px_#000]  text-xl font-bold border-2 border-black w-full`}
        >
            {link.title}
        </a>
    )

}
export default Links