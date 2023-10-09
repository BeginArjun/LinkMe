import Image from "next/image"
import Button from '../Button'
export default ()=>{
    return(
        <header className="sticky top-0 left-0 z-50 bg-transparent">
            <nav className="px-4 py-7">
                <div className="flex justify-center">
                <div className="flex rounded-full bg-white backdrop-blur-md w-full justify-between items-center p-2">
                    <Image src='/assets/logo.svg' alt='logo' width='150' height='70'/>
                    <a href='/auth'>
                        <Button className="bg-black text-white">Sign Up</Button>
                    </a>
                </div>
                </div>
            </nav>
        </header>
    )
}