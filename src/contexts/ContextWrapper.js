import React from 'react';
import AppStateProvider from "./AppStateContext";
import ScrollStateProvider from "./ScrollStateContext";
import { UIProviderContext } from "./UIStateContext";

const ContextWrapper = ( { children } ) => {


    return (
        <AppStateProvider>
            <ScrollStateProvider>

                <UIProviderContext>
                    {children}
                </UIProviderContext>

            </ScrollStateProvider>
        </AppStateProvider>
    );
};

export default ContextWrapper;
