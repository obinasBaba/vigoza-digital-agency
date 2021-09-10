import React, { useEffect, useState } from 'react'
import {useMotionValue} from "framer-motion";

export const AppStateContext = React.createContext(false)


const AppStateProvider = ( {children} ) => {

    const [dotIndex, setDotIndex] = useState(0);
    const x= useMotionValue(0)
    const y= useMotionValue(0)
    const yProgress= useMotionValue(0);
    const xProgress= useMotionValue(0);
    const limit= useMotionValue(0)
    const scrollDirection = useMotionValue('down')


    return (
    <AppStateContext.Provider value={{
        dotIndex, setDotIndex,
        moScroll: {
            x, y, yProgress, xProgress, limit, scrollDirection
        },
    }} >

      {children}

    </AppStateContext.Provider>
  )
}

export default AppStateProvider
