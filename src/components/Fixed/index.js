import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { ArrowCursor, PointerCursor } from "./CustomMouse";
import Pagination from "../Pagination";
import AppBar from "./AppBar";
import NavMenu from "./NavMenu/NavMenu";
import { ScrollStateContext } from "../../contexts/ScrollStateContext";
import { AnimatePresence } from "framer-motion";
import CaseStudyModal from "./CaseStudyModal";
import LoadingPage from "../LoadingPage";
import { useUI } from "../../contexts/UIStateContext";


const FixedContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: 10;
  
  pointer-events: none;
  
`

const Fixed = () => {

    const [openNavMenu, setOpenNavMenu] = useState(false);
    const { locoRef, } = useContext(ScrollStateContext);
    const { state: { displayLoadingPage } } = useUI();



    useEffect(() => {

        if (locoRef.get() === null) return;

        if (openNavMenu)
            locoRef.get().stop()
        else
            locoRef.get().start()


    }, [locoRef, openNavMenu])

    return (
        <FixedContainer key='fixed'>

            <CaseStudyModal/>
            <PointerCursor/>
            <ArrowCursor/>
            <Pagination/>

            <AnimatePresence exitBeforeEnter>
                {openNavMenu && <NavMenu state={{openNavMenu, setOpenNavMenu}} />}
            </AnimatePresence>

            <AppBar status={openNavMenu} onClick={() => setOpenNavMenu(!openNavMenu)}/>


        </FixedContainer>
    );
};

export default Fixed;
