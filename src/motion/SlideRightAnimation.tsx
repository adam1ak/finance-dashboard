import { motion } from "framer-motion"

import type { ReactNode } from "react";
function SlideRightAnimation({ children }: { children: ReactNode }) {
    return (
        <motion.div
            className="fixed top-0 right-0 z-20 h-screen bg-white shadow-2xl"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
                x: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 150,
                    mass: 0.5,
                    delay: 0,
                    duration: 0.6
                }
            }}
            exit={{
                x: "100%",
                opacity: 0,
                transition: {
                    ease: [0.4, 0, 0.2, 1],
                    duration: 0.6 * 0.8
                }
            }}
            transition={{
                type: "spring",
                damping: 20,
                stiffness: 150
            }}>
            {children}
        </motion.div>
    )
}

export default SlideRightAnimation