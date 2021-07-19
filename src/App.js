// noinspection CssUnknownTarget

import React, {useEffect, useRef} from 'react';
import './App.css';
import Hero from "./components/hero";
import Pagination from "./components/nav";
import About from "./components/about";
import Services from "./components/services";
import BLogs from "./components/blog";
import ProgressCircle from "./components/ProgressCircle";
import styled from "styled-components";
import Contact from "./components/contact";
import Portfolio from "./components/portfolio";

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
    const scrollRef = useRef(null);

    const skewConfigs = {
        ease: .1,
        current: 0,
        previous: 0,
        rounded: 0
    };

    useEffect(() => {
        // document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`;
    })

    useEffect(() => {
        // skewScrolling();
    }, []);

    const skewScrolling = () => {
        skewConfigs.current = window.scrollY;
        skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
        skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;

        const diff = skewConfigs.current - skewConfigs.rounded;
        const acc = diff / window.innerWidth;
        const velocity = +acc;
        const skew = velocity * 7.5;

        scrollRef.current.style.transform =
            `translate3d(0, -${skewConfigs.rounded}px, 0) skewY(${skew}deg);`;

        // requestAnimationFrame( () => skewScrolling());
    }

    return (
        <AppContainer ref={mainRef}>
            {/*<div className="scroll" ref={scrollRef}>*/}
            <Pagination/>
            <ProgressCircle/>
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
