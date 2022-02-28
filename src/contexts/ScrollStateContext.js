import React from 'react'
import {useMotionValue} from "framer-motion";

export const ScrollStateContext = React.createContext(false)


const ScrollStateProvider = ( {children} ) => {


    const x= useMotionValue(0)
    const y= useMotionValue(0)
    const yProgress= useMotionValue(0);
    const xProgress= useMotionValue(0);
    const limit= useMotionValue(0)
    const scrollDirection = useMotionValue('down')
    const locoRef = useMotionValue(null)
    const scrollPos = useMotionValue(null)
    const speed = useMotionValue(null)



    return (
        <ScrollStateContext.Provider value={{
            locoRef,
            moScroll: {x, y, limit, scrollDirection, scrollPos, speed},
        }} >

            {children}

        </ScrollStateContext.Provider>
    )
}

export default ScrollStateProvider
