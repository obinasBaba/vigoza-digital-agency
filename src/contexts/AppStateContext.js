import React, {useState} from 'react'
import {useMotionValue} from "framer-motion";

export const AppStateContext = React.createContext(false)


const AppStateProvider = ({children}) => {

    const [dotIndex, setDotIndex] = useState(0);
    const transDetail =  useMotionValue({
        fromCaseStudy: false,
        activeIdx: 0,
    });

    const nodeLength = useMotionValue({
        deco: {width: 0, height: 0}
    });


    return (
        <AppStateContext.Provider
            value={{
                dotIndex,
                setDotIndex,
                transDetail,
                // nodeLength
            }}>

            {children}

        </AppStateContext.Provider>
    )
}

export default AppStateProvider
