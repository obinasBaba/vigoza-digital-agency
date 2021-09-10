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

const AppContainer = styled.main`
  //position: fixed;
  //top: 0;
  //left: 0;
  //bottom: 0;
  //right: 0;
  //overflow: hidden;
`

function App() {

    const mainRef = useRef(null);

    const loco = useLocoScroll(true, )


    useLayoutEffect(() => {

    }, [])

    return (
        <AppContainer ref={mainRef} data-scroll-container >
            {/*<div className="scroll" ref={scrollRef}>*/}
            <Pagination/>
            <ScrollProgressCircle/>
            <Hero/>
            <About/>
            <Services/>
            <Portfolio/>
            <BLogs/>
            <Contact/>
            {/*</div>*/}
        </AppContainer>
    );
}

export default App;
