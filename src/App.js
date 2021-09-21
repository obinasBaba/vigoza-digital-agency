// noinspection CssUnknownTarget

import React, {useContext, useRef, useState} from 'react';
import styled from "styled-components";
import useLocoScroll from "./hooks/useLocoScroll";
import {AppStateContext} from "./contexts/AppStateContext";
import HomePage from "./scenes/HomePage";
import useFonts from "./hooks/useFonts";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Project from "./pages/project";
import Fixed from "./components/Fixed";
import {Typography} from "@material-ui/core";


const AppContainer = styled.main`

`

function App() {

    const mainRef = useRef(null);

    return (
        <Router>

            <AppContainer ref={mainRef} data-scroll-container id='main-container'>
                <Fixed/>

                <Switch >
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>

                    <Route path='/project/:id' >
                        <Project/>
                    </Route>

                    <Route >
                        <div>
                            <Typography variant='h1'>PAGE NOT FOUND</Typography>
                        </div>
                    </Route>


                </Switch>
            </AppContainer>
        </Router>

    );
}

export default App;
