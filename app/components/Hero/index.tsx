import { ArrowButton } from "../Button"
import { BsStars } from "react-icons/bs";
import Image from "next/image";
import {motion} from 'framer-motion'
const Hero=()=>{
    return(
        <motion.div className="h-screen text-[--global-yellow] bg-[--global-green] w-screen grid md:grid-cols-2 grid-rows-2 px-7 py-16 items-center mx-auto"
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
            <motion.div className="flex justify-center rounded-full relative"
            initial={{ scale: 0 }}
            whileInView={{ scale: [1,1.2,1] }}
            transition={{delay:0.1}}
            >
                <Image src='/assets/hero.png' alt='hero' width='300' height='300'
                className="object-contain "
                />
            </motion.div>
        </motion.div>
    )
}
export default Hero
