'use client'
import Accordion from "../Accordion"
const FAQ=()=>{
    return(
        <div className="p-11 justify-center items-center bg-[--global-maroon] w-screen h-full">
            <div className="flex flex-col justify-center gap-8 text-[--text-base] text-center">
                <p className="text-4xl">Any of these sound familiar?</p>
                <div className="flex flex-col justify-center">
                    <Accordion title="Your followers are always asking Where can I get that? 🤔">
                    <p>We provide a way to link to any product, anywhere, right from your shorts, videos and podcasts. ✌🏻</p>
                    </Accordion>
                    <Accordion title="You have to keep updating your bio link to keep up with your latest content. 🤯">
                    <p>With us, you can link to all your content, all the time. 🤩</p>
                    </Accordion>
                    <Accordion title="You have to pay for a link in bio tool. 💸">
                    <p>We are free, and always will be. 🤑</p>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default FAQ;