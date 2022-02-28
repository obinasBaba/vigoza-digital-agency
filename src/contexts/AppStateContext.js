import React, {useState} from 'react'

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
