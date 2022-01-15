import React, {useState} from 'react'
// import {useMotionValue} from "framer-motion";

export const AppStateContext = React.createContext(false)


const AppStateProvider = ({children}) => {

    const [dotIndex, setDotIndex] = useState(0);

    return (
        <AppStateContext.Provider
            value={{
                dotIndex,
                setDotIndex,
            }}>

            {children}

        </AppStateContext.Provider>
    )
}

export default AppStateProvider
