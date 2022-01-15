import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {CssBaseline, StylesProvider} from "@material-ui/core";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./GlobalStyles";
import ContextWrapper from "../contexts/ContextWrapper";


const ThemeWrapper = ({children, theme}) => {
    return (
        <ContextWrapper>
            <ThemeProvider theme={theme}>
                <StylesProvider  injectFirst>
                    <MuiThemeProvider  theme={theme}>
                        <CssBaseline />
                        <GlobalStyles />
                        {children}
                    </MuiThemeProvider>
                </StylesProvider>
            </ThemeProvider>
        </ContextWrapper>
    );
};

export default ThemeWrapper;
