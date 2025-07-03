import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import AddTransaction from "./AddTransaction"
import SlideRightAnimation from "../motion/SlideRightAnimation"

function SlidingModal() {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        const handleKeyEsc = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                setIsOpen(false)
            }
        };

        if(isOpen){
            window.addEventListener("keydown", handleKeyEsc)
        }

        return () => window.removeEventListener("keydown", handleKeyEsc)
    },[isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
                Open Modal
            </button>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed z-50 h-screen">
                        <div
                            className="fixed left-0 top-0 z-10 w-full h-full"
                            onClick={() => setIsOpen(false)}>xd</div>
                        
                        <SlideRightAnimation children={<AddTransaction/>} /> 
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SlidingModal
