// noinspection CssUnknownTarget

import React, {useEffect, useLayoutEffect, useRef} from 'react';
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

const AppContainer = styled.main`

`

function App() {

    const mainRef = useRef(null);

    const loco = useLocoScroll(true,)


    return (
        <AppContainer ref={mainRef} data-scroll-container>
            <Fixed/>
            <Hero/>
            <About/>
            <Services/>
            <Portfolio/>
            <BLogs/>
            <Contact/>
            <Footer/>
        </AppContainer>
    );
}

export default App;
