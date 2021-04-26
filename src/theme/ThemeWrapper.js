import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {CssBaseline, StylesProvider, ThemeProviderProps} from "@material-ui/core";
import {ThemeProvider} from "styled-components";



const ThemeWrapper: React.FC<Boolean> = ({children, theme}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>
                        {children}
                    </MuiThemeProvider>
                </StylesProvider>
            </ThemeProvider>
        </>
    );
};

export default ThemeWrapper;
