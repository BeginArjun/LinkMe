import Image from "next/image"

export default ()=>{
    return(
        <header className="sticky top-0 left-0 z-50 bg-transparent">
            <nav className="px-4 py-7">
                <div className="flex justify-center">
                <div className="flex rounded-full bg-white backdrop-blur-md w-full">
                    <Image src='/assets/logo.svg' alt='logo' width='150' height='70'/>
                </div>
                </div>
            </nav>
        </header>
    )
}