// noinspection CssUnknownTarget

import React from 'react';
import './App.css';
import Hero from "./components/hero";
import Pagination from "./components/nav";
import About from "./components/about";
import Services from "./components/services";
import BLogs from "./components/blog";
import ProgressCircle from "./components/ProgressCircle";


function App() {

    return (
        <React.Fragment>
            <Pagination/>
            <ProgressCircle />
            <Hero/>
            <About/>
            <Services />
            <BLogs/>
        </React.Fragment>
    );
}

export default App;
