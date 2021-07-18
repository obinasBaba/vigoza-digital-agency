// noinspection CssUnknownTarget

import React from 'react';
import './App.css';
import Hero from "./components/hero";
import Pagination from "./components/nav";
import About from "./components/about";
import Services from "./components/services";


function App() {

    return (
        <React.Fragment>
            <Pagination/>
            <Hero/>
            <About/>
            <Services />
        </React.Fragment>
    );
}

export default App;
