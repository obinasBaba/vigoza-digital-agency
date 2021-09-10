// noinspection CssUnknownTarget

import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import './App.css';
import Hero from "./components/hero";
import Pagination from "./components/nav";
import About from "./components/about";
import Services from "./components/services";
import BLogs from "./components/blog";
import styled from "styled-components";
import Contact from "./components/contact";
import Portfolio from "./components/portfolio";
import ScrollProgressCircle from "./components/ScrollProgressCircle";
import useLocoScroll from "./hooks/useLocoScroll";
import Footer from "./components/Footer";
import Fixed from "./components/Fixed";
import LoadingPage from "./components/LoadingPage";
import {AppStateContext} from "./contexts/AppStateContext";

const AppContainer = styled.main`

`

function App() {

    const mainRef = useRef(null);
    const { locoRef } = useContext(AppStateContext);

    locoRef.set(useLocoScroll(true,));

    return (
        <AppContainer ref={mainRef} data-scroll-container>
            {
                false ?
                    <LoadingPage/>
                    :
                    <>
                        <Fixed/>
                        <Hero/>
                        <About/>
                        <Services/>
                        <Portfolio/>
                        <BLogs/>
                        <Contact/>
                        <Footer/>
                    </>
            }
        </AppContainer>
    );
}

export default App;
