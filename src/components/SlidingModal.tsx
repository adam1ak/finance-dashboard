import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import SlideRightAnimation from "../motion/SlideRightAnimation"
import type { ReactNode } from "react";


function SlidingModal({
    children,
    isOpen,
    closeModal,
    onClose,
}: {
    children: ReactNode;
    isOpen: boolean;
    closeModal: (open: boolean) => void;
    onClose?: () => void;
}) {


    useEffect(() => {

        const handleKeyEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal(false)
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyEsc)
        }

        return () => window.removeEventListener("keydown", handleKeyEsc)
    }, [isOpen])

    const handleClose = () => {
        closeModal(false)
        onClose?.()
    }


    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed z-50 h-screen">
                        <div
                            className="fixed left-0 top-0 z-10 w-full h-full"
                            onClick={() => handleClose()} />
                        <SlideRightAnimation children={children} />
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SlidingModal
