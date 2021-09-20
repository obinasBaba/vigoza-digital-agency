import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {ArrowCursor, PointerCursor} from "./CustomMouse";
import ScrollProgressCircle from "../ScrollProgressCircle";
import Pagination from "../nav";
import AppBar from "./AppBar";
import NavMenu from "./NavMenu/NavMenu";
import {AppStateContext} from "../../contexts/AppStateContext";


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

    return (
        <FixedContainer>
            <PointerCursor/>
            <ArrowCursor/>
            <Pagination/>
            <ScrollProgressCircle/>
            {
                openNavMenu && <NavMenu/>
            }
            <AppBar status={openNavMenu} onClick={() => setOpenNavMenu(!openNavMenu)}/>

        </FixedContainer>
    );
};

export default Fixed;
