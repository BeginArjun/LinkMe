import { ArrowButton } from "../Button"
import { BsStars } from "react-icons/bs";
import Image from "next/image";
import {motion} from 'framer-motion'
const Hero=()=>{
    return(
        <motion.div className="h-full md:h-screen text-[--global-yellow] bg-[--global-green] w-screen flex flex-col justify-between md:flex-row px-7 py-16 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
            <motion.div className="flex flex-col gap-4"
            initial={{x:-100}}
            whileInView={{x:0}}
            transition={{duration:0.5}} layout
            >
                <p className="font-bold md:text-5xl text-4xl whitespace-pre-line">Not just a 
                Link In Bio</p>
                <p className="font-thin tracking-wider mt-4">Make everything you promote on social media
                     <span className="underline flex justify-start items-start font-medium decoration-[--brand-primary] decoration-2 underline-offset-2">
                         easily available to your followers <BsStars className="text-lg"/></span> 
                </p>
                <ArrowButton className="bg-[--brand-primary] text-black w-auto md:w-60 mt-4">Try it Free</ArrowButton>
            </motion.div>
            <motion.div className="flex justify-center items-center h-full relative"
            >
                <img src='/assets/heromockup.png' alt='hero' height='300'
                className="object-contain relative object-center"
                />
            </motion.div>
        </motion.div>
    )
}
export default Hero
