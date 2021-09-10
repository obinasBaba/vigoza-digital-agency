import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {CssBaseline, StylesProvider} from "@material-ui/core";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./GlobalStyles";
import AppStateProvider from "../contexts/AppStateContext";


const ThemeWrapper = ({children, theme}) => {
    return (
        <AppStateProvider>
            <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>
                        <GlobalStyles />
                        {children}
                    </MuiThemeProvider>
                </StylesProvider>
            </ThemeProvider>
        </AppStateProvider>
    );
};

export default ThemeWrapper;
