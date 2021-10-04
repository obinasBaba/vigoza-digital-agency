// noinspection CssUnknownTarget

import React, {useRef} from 'react';
import styled from "styled-components";
import HomePage from "./scenes/HomePage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CaseStudy from "./pages/case-study";
import Fixed from "./components/Fixed";
import {Typography} from "@material-ui/core";
import Tuts from "./pages/tuts";


const AppContainer = styled.main`
    width: 100%;
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
                        <CaseStudy/>
                    </Route>
                    
                    <Route path='/tuts' >
                        <Tuts/>
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
