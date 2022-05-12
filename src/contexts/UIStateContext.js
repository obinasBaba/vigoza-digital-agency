import React, { useLayoutEffect } from 'react';
import { useMotionValue } from "framer-motion";


const initialState = {
    displayCaseStudyEvent: null,
    displayCaseStudy: false
}


export const UIContext = React.createContext( initialState );
UIContext.displayName = 'UIContext'

function uiReducer( state, action ){
    switch ( action.type ) {
        case 'TOGGLE_CASE_STUDY': {
            const updatedState =  {
                ...state,
                displayCaseStudy: !state.displayCaseStudy
            };
            updatedState.displayCaseStudyEvent?.set(updatedState.displayCaseStudy)
            return updatedState;
        }
        default:
            return {}
    }
}

export function UIProvider( props ){

    initialState.displayCaseStudyEvent = useMotionValue(false);
    const [state, dispatch] = React.useReducer( uiReducer, initialState );

    const toggleIt = () => { //👉🏾 test it with 'useCallback'
        dispatch( { type: 'TOGGLE_CASE_STUDY' } )
    }

    const value = {  //👉🏾 test it with 'useMemo'
        state,
        toggleIt
    }

    return <UIContext.Provider value={value} {...props}/>
}

export const useUI = () => {
    const context = React.useContext( UIContext )
    if ( !context )
        throw new Error( 'useUI must be used within a UIProvider' )

    return context;
}

export function UIProviderContext( { children } ){
    return (
        <UIProvider>
            {children}
        </UIProvider>
    )
}
