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
    const locoRef = useMotionValue(null)
    const scrollPos = useMotionValue(null)



    return (
    <AppStateContext.Provider value={{
        dotIndex,
        setDotIndex,
        locoRef,
        moScroll: {
            x, y, limit, scrollDirection, scrollPos
        },
    }} >

      {children}

    </AppStateContext.Provider>
  )
}

export default AppStateProvider
