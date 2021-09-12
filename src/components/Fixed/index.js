import React from 'react';
import styled from "styled-components";
import {ArrowCursor, PointerCursor} from "./CustomMouse";
import ScrollProgressCircle from "../ScrollProgressCircle";
import Pagination from "../nav";
import AppBar from "./AppBar";


const FixedContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  
  pointer-events: none;
  
`

const Fixed = () => {
    return (
        <FixedContainer>
            <PointerCursor/>
            <ArrowCursor/>
            <Pagination/>
            <ScrollProgressCircle/>
            <AppBar/>
        </FixedContainer>
    );
};

export default Fixed;
