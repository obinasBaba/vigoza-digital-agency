import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {ArrowCursor, PointerCursor} from "./CustomMouse";
import Pagination from "../Pagination";
import AppBar from "./AppBar";
import NavMenu from "./NavMenu/NavMenu";
import {ScrollStateContext} from "../../contexts/ScrollStateContext";
import {AnimatePresence} from "framer-motion";


const FixedContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  
  pointer-events: none;
  
`

const Fixed = () => {

    const [openNavMenu, setOpenNavMenu] = useState(false);
    const { locoRef, } = useContext(ScrollStateContext);


    useEffect(() => {

        if (locoRef.get() === null) return;

        if (openNavMenu)
            locoRef.get().stop()
        else
            locoRef.get().start()


    }, [locoRef, openNavMenu])

    return (
        <FixedContainer>
            <PointerCursor/>
            <ArrowCursor/>
            <Pagination/>

            <AnimatePresence exitBeforeEnter>
                {openNavMenu && <NavMenu/>}
            </AnimatePresence>

            <AppBar status={openNavMenu} onClick={() => setOpenNavMenu(!openNavMenu)}/>

        </FixedContainer>
    );
};

export default Fixed;
