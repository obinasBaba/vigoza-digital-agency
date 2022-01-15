import React from 'react';
import AppStateProvider from "./AppStateContext";
import ScrollStateProvider from "./ScrollStateContext";

const ContextWrapper = ({children}) => {



    return (
        <AppStateProvider>
            <ScrollStateProvider>
                {children}
            </ScrollStateProvider>
        </AppStateProvider>
    );
};

export default ContextWrapper;
