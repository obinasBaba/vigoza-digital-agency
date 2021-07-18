import {MuiThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import {CssBaseline, StylesProvider} from "@material-ui/core";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./GlobalStyles";
import '../styles/fontFace.css'


const ThemeWrapper: React.FC<Boolean> = ({children, theme}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <StylesProvider injectFirst>
                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>
                        <GlobalStyles />
                        {children}
                    </MuiThemeProvider>
                </StylesProvider>
            </ThemeProvider>
        </>
    );
};

export default ThemeWrapper;
