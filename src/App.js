// noinspection CssUnknownTarget

import React, { useContext, useRef, useState } from 'react';
import styled from "styled-components";
import HomePage from "./scenes/HomePage";
import { Route, Routes, Switch, useLocation } from 'react-router-dom'
import CaseStudy from "./pages/case-study";
import Fixed from "./components/Fixed";
import { Typography } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { AppStateContext } from "./contexts/AppStateContext";
import useFonts from "./hooks/useFonts";
import useLocoScroll from "./hooks/useLocoScroll";


const AppContainer = styled.main`
  //position: relative;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  scroll-snap-type: y mandatory;

`

const MainContainer = styled.main`
  width: 100%;
`

function App(){

    const mainRef = useRef( null );
    const location = useLocation();

    const [fontLoaded, setFontLoaded] = useState( false );

    useFonts( setFontLoaded );

    useLocoScroll( fontLoaded );

    return (

        <AppContainer>

            <AnimatePresence exitBeforeEnter={true}>

                <Fixed/>
                <MainContainer ref={mainRef} data-scroll-container id='main-container'>
                    <Routes location={location} key={location.key}>
                        <Route exact path='/' element={<HomePage/>}/>
                        <Route path='/project/:id' element={<CaseStudy/>}/>
                        <Route element={<div>
                            <Typography variant='h1'>PAGE NOT FOUND</Typography>
                        </div>}/>

                    </Routes>
                </MainContainer>

            </AnimatePresence>

        </AppContainer>

    );
}

export default App;
