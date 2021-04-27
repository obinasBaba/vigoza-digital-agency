// noinspection CssUnknownTarget

import React from 'react';
import './App.css';
import Hero from "./components/hero";
import Pagination from "./components/nav";
import About from "./components/about";


function App() {

    return (
        <React.Fragment>
            <Pagination/>
            <Hero/>
            <About/>
        </React.Fragment>
    );
}

export default App;
