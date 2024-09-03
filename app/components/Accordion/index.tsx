'use client'


import {motion} from 'framer-motion'

interface AccordionProps{
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Accordions=({title, children,className}: AccordionProps) =>{
    return(
        <motion.div
        initial={{transform: 'translateY(-100px)', opacity: 0}} whileInView={{transform: 'translateY(0px)', opacity: 1}}
        className='flex justify-center rounded-lg'
        >
        </motion.div>
    )
}
export default Accordions;