import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { User } from "@prisma/client";

const Header = () => {
    const user = useSelector((state: RootState) => state.user as User | null);
    const [copied, setCopied] = useState(false);

    const copytoClipboard = useCallback(()=>{
        if(user?.username!==undefined) {
            navigator.clipboard.writeText(`https://linkme.com/${user?.username}`);
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
            },2000)
        } else {
            console.error("user?.username is undefined")
        }
    },[user?.username])

    return(
        <section className="flex justify-between items-center mt-2 gap-4 md:w-full sm:w-[356px]
         bg-white rounded-full p-2 border border-black shadow-[2px_2px_0_0_#000] group active:shadow-none">
            <div className="flex lg:flex-row md:flex-col lg:justify-center md:justify-start md:items-start">
                <p className="after:content-[' '] whitespace-break-spaces font-medium">🔥 Your LinkME is live : </p>
                <a href={`https://linkme.com/${user?.username}`} target="_blank" rel="noreferrer"
                className="underline italic font-light"
                >{`https://linkme.com/${user?.username}`}</a>
            </div>
            <button type="button"
            onClick={copytoClipboard}
             className="bg-white rounded-full p-4 border border-black hover:bg-gray-100 active:bg-gray-50 active:border-0 
             lg:min-w-[200px] md:min-w-[100px]">
                {
                    copied ? <p className="after:content-[' ✔'] font-medium tracking-wide leading-relaxed">Copied!</p> : (
                        <p className="font-medium tracking-wide leading-relaxed">Copy your LinkME URL</p>
                    )
                }
             </button>
        </section>
    )
}

export default Header;