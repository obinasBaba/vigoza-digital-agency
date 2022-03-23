// noinspection CssUnknownTarget

import React, {useContext, useRef} from 'react';
import styled from "styled-components";
import HomePage from "./scenes/HomePage";
import { Route, Routes,Switch, useLocation} from 'react-router-dom'
import CaseStudy from "./pages/case-study";
import Fixed from "./components/Fixed";
import {Typography} from "@material-ui/core";
import {AnimatePresence} from "framer-motion";
import {AppStateContext} from "./contexts/AppStateContext";


const AppContainer = styled.main`
    width: 100%;
`

function App() {

    const mainRef = useRef(null);
    const location = useLocation();



    return (

            <AppContainer ref={mainRef} data-scroll-container id='main-container'>

                <Fixed/>

                <AnimatePresence exitBeforeEnter={true} >
                    <Routes location={location} key={location.key}>
                        <Route exact path='/' element={<HomePage/>}/>
                        <Route path='/project/:id' element={<CaseStudy/>} />
                        <Route element={<div>
                            <Typography variant='h1'>PAGE NOT FOUND</Typography>
                        </div>}/>

                    </Routes>
                </AnimatePresence>
            </AppContainer>

    );
}

export default App;
