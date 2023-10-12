'use client'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

import {motion} from 'framer-motion'

interface AccordionProps{
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default ({title, children,className}: AccordionProps) =>{
    return(
        <motion.div
        initial={{transform: 'translateY(-100px)', opacity: 0}} whileInView={{transform: 'translateY(0px)', opacity: 1}}
        className='flex justify-center rounded-lg'
        >
            <Accordion allowToggle className={`${className} bg-[--ruby] rounded-lg w-full px-4 py-11 text-[--text-base]`}>
                <AccordionItem className='border-none'>
                    <h2>
                        <AccordionButton>
                            <AccordionIcon />
                            {title}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {children}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </motion.div>
    )
}