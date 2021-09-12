// noinspection CssUnknownTarget

import React, {useContext, useRef, useState} from 'react';
import styled from "styled-components";
import useLocoScroll from "./hooks/useLocoScroll";
import LoadingPage from "./components/LoadingPage";
import {AppStateContext} from "./contexts/AppStateContext";
import HomePage from "./scenes/HomePage";
import useFonts from "./hooks/useFonts";


const AppContainer = styled.main`

`

function App() {

    const mainRef = useRef(null);
    const { locoRef } = useContext(AppStateContext);
    const [fontLoaded, setFontLoaded] = useState(false);


    useFonts(setFontLoaded);

    locoRef.set(useLocoScroll(fontLoaded));


    return (
        <AppContainer ref={mainRef} data-scroll-container id='main-container'>
            {
                !fontLoaded ?
                    <LoadingPage/>
                    :
                    <HomePage/>

            }
        </AppContainer>
    );
}

export default App;
